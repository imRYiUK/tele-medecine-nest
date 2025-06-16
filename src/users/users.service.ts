import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../common/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(utilisateurID: string): Promise<UserDto | null> {
    const user = await this.prisma.utilisateur.findUnique({
      where: { utilisateurID },
    });
    if (!user) return null;
    return user;
  }

  async findById(userId: string): Promise<UserDto | null> {
    return this.prisma.utilisateur.findUnique({
      where: { utilisateurID: userId },
    });
  }
}
