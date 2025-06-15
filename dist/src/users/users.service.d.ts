import { User } from './user.entity';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findOne(utilisateurID: string): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    validateUser(email: string, password: string): Promise<User | null>;
}
