import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto, CreateUserDto, UpdateUserDto } from '../common/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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

  async findAll(): Promise<UserDto[]> {
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

    await this.prisma.utilisateur.delete({
      where: { utilisateurID },
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
}
