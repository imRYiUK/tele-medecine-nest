import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto, CreateUserDto, UpdateUserDto } from '../common/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JournalActivityService } from '../journal/journal-activity.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private journalActivityService: JournalActivityService,
  ) {}

  async create(createUserDto: CreateUserDto, adminId: string): Promise<UserDto> {
    // Check if username or email already exists
    const existingUser = await this.prisma.utilisateur.findFirst({
      where: {
        OR: [
          { username: createUserDto.username },
          { email: createUserDto.email }
        ]
      }
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.utilisateur.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    // Journaliser l'action
    await this.journalActivityService.logActivity({
      utilisateurID: adminId,
      typeAction: 'CREATION_UTILISATEUR',
      description: `Création d'un nouvel utilisateur: ${user.nom} ${user.prenom} (${user.username})`,
    });

    const { password, ...result } = user;
    return result;
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.prisma.utilisateur.findMany();
    return users.map(user => {
      const { password, ...result } = user;
      return result;
    });
  }

  async findOne(utilisateurID: string): Promise<UserDto> {
    const user = await this.prisma.utilisateur.findUnique({
      where: { utilisateurID },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${utilisateurID} not found`);
    }

    const { password, ...result } = user;
    return result;
  }

  async findById(userId: string): Promise<UserDto> {
    return this.findOne(userId);
  }

  async update(utilisateurID: string, updateUserDto: UpdateUserDto, adminId: string): Promise<UserDto> {
    // Check if user exists
    const existingUser = await this.findOne(utilisateurID);

    // If username or email is being updated, check for conflicts
    if (updateUserDto.username || updateUserDto.email) {
      const conflictingUser = await this.prisma.utilisateur.findFirst({
        where: {
          AND: [
            { utilisateurID: { not: utilisateurID } },
            {
              OR: [
                { username: updateUserDto.username },
                { email: updateUserDto.email }
              ]
            }
          ]
        }
      });

      if (conflictingUser) {
        throw new ConflictException('Username or email already exists');
      }
    }

    // If password is being updated, hash it
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.prisma.utilisateur.update({
      where: { utilisateurID },
      data: updateUserDto,
    });

    // Journaliser l'action
    await this.journalActivityService.logActivity({
      utilisateurID: adminId,
      typeAction: 'MODIFICATION_UTILISATEUR',
      description: `Modification des informations de l'utilisateur: ${updatedUser.nom} ${updatedUser.prenom} (${updatedUser.username})`,
    });

    const { password, ...result } = updatedUser;
    return result;
  }

  async remove(utilisateurID: string, adminId: string): Promise<void> {
    // Check if user exists
    const user = await this.findOne(utilisateurID);

    await this.prisma.utilisateur.delete({
      where: { utilisateurID },
    });

    // Journaliser l'action
    await this.journalActivityService.logActivity({
      utilisateurID: adminId,
      typeAction: 'SUPPRESSION_UTILISATEUR',
      description: `Suppression de l'utilisateur: ${user.nom} ${user.prenom} (${user.username})`,
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

  async updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    // Prevent users from updating sensitive fields
    const { role, estActif, ...safeUpdateData } = updateUserDto;
    
    const updatedUser = await this.update(userId, safeUpdateData, userId);

    // Journaliser l'action
    await this.journalActivityService.logActivity({
      utilisateurID: userId,
      typeAction: 'MODIFICATION_PROFIL',
      description: `Modification du profil utilisateur`,
    });

    return updatedUser;
  }
}
