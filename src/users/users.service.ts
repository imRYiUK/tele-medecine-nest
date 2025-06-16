import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto, CreateUserDto, UpdateUserDto } from '../common/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
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

  async update(utilisateurID: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    // Check if user exists
    await this.findOne(utilisateurID);

    // If username or email is being updated, check for conflicts
    if (updateUserDto.username || updateUserDto.email) {
      const existingUser = await this.prisma.utilisateur.findFirst({
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

      if (existingUser) {
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

    const { password, ...result } = updatedUser;
    return result;
  }

  async remove(utilisateurID: string): Promise<void> {
    // Check if user exists
    await this.findOne(utilisateurID);

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

  async updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    // Prevent users from updating sensitive fields
    const { role, estActif, ...safeUpdateData } = updateUserDto;
    
    return this.update(userId, safeUpdateData);
  }
}
