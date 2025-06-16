import { PrismaService } from '../prisma/prisma.service';
import { UserDto, CreateUserDto, UpdateUserDto } from '../common/dto/user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto, adminId: string): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
    findOne(utilisateurID: string): Promise<UserDto>;
    findById(userId: string): Promise<UserDto>;
    update(id: string, updateUserDto: UpdateUserDto, adminId: string): Promise<{
        etablissement: {
            etablissementID: string;
            nom: string;
        } | null;
        nom: string;
        telephone: string;
        email: string;
        utilisateurID: string;
        prenom: string;
        username: string;
        role: string;
        estActif: boolean;
    }>;
    remove(utilisateurID: string, adminId: string): Promise<void>;
    getProfile(userId: string): Promise<UserDto>;
    updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<{
        etablissement: {
            etablissementID: string;
            nom: string;
        } | null;
        nom: string;
        telephone: string;
        email: string;
        utilisateurID: string;
        prenom: string;
        username: string;
        role: string;
        estActif: boolean;
    }>;
}
