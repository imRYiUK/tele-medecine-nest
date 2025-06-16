import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../common/dto/user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(utilisateurID: string): Promise<UserDto | null>;
    findById(userId: string): Promise<UserDto | null>;
}
