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
      include: { roles: true },
    });

    return user as unknown as User;
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { roles: true },
    });

    return user as unknown as User;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOne(email);
    
    if (!user) {
      this.logger.warn(`Login attempt for non-existent user: ${email}`);
      return null;
    }
    
    if (!user.isActive) {
      this.logger.warn(`Login attempt for inactive/locked account: ${email}`);
      return null; // Account is locked or inactive
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      // Update failed login attempts
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: { increment: 1 },
          isActive: user.failedLoginAttempts >= 4 ? false : undefined, // Lock after 5 attempts (current + increment)
        },
      });

      // Log the failed attempt
      await this.logAuthAttempt(user.id, false, 'Invalid password');
      
      this.logger.warn(`Failed login attempt for user: ${email}`);
      return null;
    }
    
    // Reset failed attempts and update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lastLogin: new Date(),
      },
    });

    // Log the successful attempt
    await this.logAuthAttempt(user.id, true, 'Login successful');
    
    this.logger.log(`Successful login for user: ${email}`);
    return user;
  }
  
  async logAuthAttempt(userId: number, success: boolean, message?: string) {
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

  async register(email: string, password: string, roles: string[]): Promise<User> {
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
        email,
        password: hashedPassword,
        isActive: true,
        failedLoginAttempts: 0,
        roles: {
          create: roles.map(role => ({
            name: role,
          })),
        },
      },
      include: {
        roles: true,
      },
    });

    this.logger.log(`User registered successfully: ${email}`);
    return user as unknown as User;
  }
}
