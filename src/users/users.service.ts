import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto, CreateUserDto, UpdateUserDto } from '../common/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../common/constants/roles';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private validateRoleHierarchy(requesterRole: string, targetRole: string): boolean {
    if (requesterRole === UserRole.SUPER_ADMIN) {
      return true; // SUPER_ADMIN can manage all roles
    }
    if (requesterRole === UserRole.ADMINISTRATEUR && targetRole !== UserRole.SUPER_ADMIN) {
      return true; // ADMIN can manage all roles except SUPER_ADMIN
    }
    return false;
  }

  async create(createUserDto: CreateUserDto, adminId: string): Promise<UserDto> {
    const { password, ...userData } = createUserDto;

    // Check if username or email already exists
    const existingUser = await this.prisma.utilisateur.findFirst({
      where: {
        OR: [
          { username: userData.username },
          { email: userData.email }
        ]
      }
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.utilisateur.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    const { password: _, ...result } = user;
    return result;
  }

  async findAll(requesterRole?: string): Promise<UserDto[]> {
    const users = await this.prisma.utilisateur.findMany({
      select: {
        utilisateurID: true,
        nom: true,
        prenom: true,
        email: true,
        username: true,
        telephone: true,
        role: true,
        estActif: true,
        etablissement: {
          select: {
            etablissementID: true,
            nom: true,
          },
        },
      },
    });

    // If requesterRole is provided, filter users based on role hierarchy
    if (requesterRole) {
      return users.filter(user => this.validateRoleHierarchy(requesterRole, user.role));
    }

    return users;
  }

  async findOne(utilisateurID: string): Promise<UserDto> {
    const user = await this.prisma.utilisateur.findUnique({
      where: { utilisateurID },
      select: {
        utilisateurID: true,
        nom: true,
        prenom: true,
        email: true,
        username: true,
        telephone: true,
        role: true,
        estActif: true,
        etablissement: {
          select: {
            etablissementID: true,
            nom: true,
          },
        },
      },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${utilisateurID} not found`);
    }

    return user;
  }

  async findById(userId: string): Promise<UserDto> {
    return this.findOne(userId);
  }

  async update(id: string, updateUserDto: UpdateUserDto, adminId: string) {
    const { password, ...updateData } = updateUserDto;

    // Vérifier si l'utilisateur existe
    const existingUser = await this.prisma.utilisateur.findUnique({
      where: { utilisateurID: id },
    });

    if (!existingUser) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await this.prisma.utilisateur.update({
      where: { utilisateurID: id },
      data: {
        ...updateData,
        ...(password && { password: await bcrypt.hash(password, 10) }),
      },
      select: {
        utilisateurID: true,
        nom: true,
        prenom: true,
        email: true,
        username: true,
        telephone: true,
        role: true,
        estActif: true,
        etablissement: {
          select: {
            etablissementID: true,
            nom: true,
          },
        },
      },
    });

    return updatedUser;
  }

  async remove(utilisateurID: string, adminId: string): Promise<void> {
    // Check if user exists
    const user = await this.findOne(utilisateurID);

    // Use a transaction to handle foreign key constraints
    await this.prisma.$transaction(async (prisma) => {
      // Delete related records in the correct order to avoid foreign key violations
      
      // Delete chat messages sent by the user
      await prisma.chatMessage.deleteMany({
        where: { senderID: utilisateurID }
      });

      // Delete image collaborations where user is inviter or invitee
      await prisma.imageCollaboration.deleteMany({
        where: {
          OR: [
            { inviterID: utilisateurID },
            { inviteeID: utilisateurID }
          ]
        }
      });

      // Delete notifications for the user
      await prisma.notification.deleteMany({
        where: { utilisateurID }
      });

      // Delete journal activities for the user
      await prisma.journalActivite.deleteMany({
        where: { utilisateurID }
      });

      // Delete doctor schedules
      await prisma.horaireMedecin.deleteMany({
        where: { medecinID: utilisateurID }
      });

      // Delete appointments where user is creator or doctor
      await prisma.rendezVous.deleteMany({
        where: {
          OR: [
            { createdByID: utilisateurID },
            { medecinID: utilisateurID }
          ]
        }
      });

      // Delete medical consultations where user is doctor
      await prisma.consultationMedicale.deleteMany({
        where: { medecinID: utilisateurID }
      });

      // Delete medical exams ordered by the user
      await prisma.examenMedical.deleteMany({
        where: { demandeParID: utilisateurID }
      });

      // Delete medical records created by the user
      await prisma.dossierMedical.deleteMany({
        where: { createdBy: utilisateurID }
      });

      // Delete patients created by the user
      await prisma.patient.deleteMany({
        where: { createdBy: utilisateurID }
      });

      // Now delete the user
      await prisma.utilisateur.delete({
        where: { utilisateurID },
      });
    });
  }

  async getProfile(userId: string): Promise<UserDto> {
    const user = await this.findById(userId);
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      ...user,
      fullName: `${user.prenom} ${user.nom}`,
    } as UserDto;
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    const { password, ...updateData } = updateUserDto;

    // Vérifier si l'utilisateur existe
    const existingUser = await this.prisma.utilisateur.findUnique({
      where: { utilisateurID: userId },
    });

    if (!existingUser) {
      throw new NotFoundException('Profil utilisateur non trouvé');
    }

    // Mettre à jour le profil
    const updatedUser = await this.prisma.utilisateur.update({
      where: { utilisateurID: userId },
      data: {
        ...updateData,
        ...(password && { password: await bcrypt.hash(password, 10) }),
      },
      select: {
        utilisateurID: true,
        nom: true,
        prenom: true,
        email: true,
        username: true,
        telephone: true,
        role: true,
        estActif: true,
        etablissement: {
          select: {
            etablissementID: true,
            nom: true,
          },
        },
      },
    });

    return updatedUser;
  }

  async findMedecinsByEtablissement(etablissementID: string): Promise<UserDto[]> {
    return this.prisma.utilisateur.findMany({
      where: {
        role: UserRole.MEDECIN,
        etablissementID,
      },
      select: {
        utilisateurID: true,
        nom: true,
        prenom: true,
        email: true,
        username: true,
        telephone: true,
        role: true,
        estActif: true,
        etablissement: {
          select: {
            etablissementID: true,
            nom: true,
          },
        },
      },
    });
  }

  /**
   * Search users by email, name, or username
   */
  async searchUsers(query: string, requesterRole?: string): Promise<UserDto[]> {
    const users = await this.prisma.utilisateur.findMany({
      where: {
        OR: [
          { email: { contains: query } },
          { nom: { contains: query } },
          { prenom: { contains: query } },
          { username: { contains: query } },
        ],
      },
      select: {
        utilisateurID: true,
        nom: true,
        prenom: true,
        email: true,
        username: true,
        telephone: true,
        role: true,
        estActif: true,
        etablissement: {
          select: {
            etablissementID: true,
            nom: true,
          },
        },
      },
    });

    // If requesterRole is provided, filter users based on role hierarchy
    if (requesterRole) {
      return users.filter(user => this.validateRoleHierarchy(requesterRole, user.role));
    }

    return users;
  }
}
