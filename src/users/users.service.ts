import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    return user as unknown as User;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      include: { role: true },
    });

    return user as unknown as User;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOne(email);
    
    if (!user) {
      this.logger.warn(`Login attempt for non-existent user: ${email}`);
      return null;
    }
    
    // Nous avons supprimé la vérification isActive car ce champ n'existe plus dans le modèle User
    // Si vous souhaitez ajouter cette fonctionnalité, vous devrez ajouter un champ isActive au modèle User
    
    // Vérifier que password existe avant de l'utiliser
    if (!user.password) {
      this.logger.warn(`User ${email} has no password set`);
      return null;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      // Note: Les champs failedLoginAttempts et isActive n'existent plus dans le modèle User
      // Si vous souhaitez suivre les tentatives de connexion échouées, vous devrez ajouter ces champs au modèle User
      // Pour l'instant, nous nous contentons de journaliser l'événement

      // Log the failed attempt
      await this.logAuthAttempt(user.userId, false, 'Invalid password');
      
      this.logger.warn(`Failed login attempt for user: ${email}`);
      return null;
    }
    
    // Note: Les champs failedLoginAttempts et lastLogin n'existent plus dans le modèle User
    // Si vous souhaitez suivre les connexions réussies, vous devrez ajouter ces champs au modèle User
    // Pour l'instant, nous nous contentons de journaliser l'événement

    // Log the successful attempt
    await this.logAuthAttempt(user.userId, true, 'Login successful');
    
    this.logger.log(`Successful login for user: ${email}`);
    return user;
  }
  
  async logAuthAttempt(userId: string, success: boolean, message?: string) {
    try {
      await this.prisma.authLog.create({
        data: {
          userId,
          success,
          message,
          ipAddress: '127.0.0.1', // In a real app, get from request
          userAgent: 'API Client', // In a real app, get from request
        },
      });
    } catch (error) {
      this.logger.error(`Failed to log auth attempt: ${error.message}`);
    }
  }
  
  // Helper method to hash passwords
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async register(email: string, password: string, roleId: number): Promise<User> {
    // Check if user already exists
    const existingUser = await this.findOne(email);
    if (existingUser) {
      this.logger.warn(`Registration attempt with existing email: ${email}`);
      throw new ConflictException('Email already registered');
    }

    // Hash the password
    const hashedPassword = await this.hashPassword(password);

    // Create the user
    const user = await this.prisma.user.create({
      data: {
        nom: 'Nouveau',
        prenom: 'Utilisateur',
        email,
        password: hashedPassword,
        roleId,
      },
      include: {
        role: true,
      },
    });

    this.logger.log(`User registered successfully: ${email}`);
    return user as unknown as User;
  }
}
