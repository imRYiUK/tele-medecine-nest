import { User } from './user.entity';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    validateUser(email: string, password: string): Promise<User | null>;
    logAuthAttempt(userId: string, success: boolean, message?: string): Promise<void>;
    hashPassword(password: string): Promise<string>;
    register(email: string, password: string, roleId: number): Promise<User>;
}
