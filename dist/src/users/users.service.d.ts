import { PrismaService } from '../prisma/prisma.service';
import { UserDto, CreateUserDto, UpdateUserDto } from '../common/dto/user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    private validateRoleHierarchy;
    create(createUserDto: CreateUserDto, adminId: string): Promise<UserDto>;
    findAll(requesterRole?: string): Promise<UserDto[]>;
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
        estActif: boolean;
        utilisateurID: string;
        prenom: string;
        username: string;
        role: string;
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
        estActif: boolean;
        utilisateurID: string;
        prenom: string;
        username: string;
        role: string;
    }>;
    findMedecinsByEtablissement(etablissementID: string): Promise<UserDto[]>;
}
