import { User } from './user.entity';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    validateUser(email: string, password: string): Promise<User | null>;
    logAuthAttempt(userId: number, success: boolean, message?: string): Promise<void>;
    hashPassword(password: string): Promise<string>;
}
