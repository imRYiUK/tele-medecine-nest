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
        utilisateurID: string;
        nom: string;
        prenom: string;
        username: string;
        email: string;
        telephone: string;
        role: string;
        estActif: boolean;
        etablissement: {
            nom: string;
            etablissementID: string;
        } | null;
    }>;
    remove(utilisateurID: string, adminId: string): Promise<void>;
    getProfile(userId: string): Promise<UserDto>;
    updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<{
        utilisateurID: string;
        nom: string;
        prenom: string;
        username: string;
        email: string;
        telephone: string;
        role: string;
        estActif: boolean;
        etablissement: {
            nom: string;
            etablissementID: string;
        } | null;
    }>;
    findMedecinsByEtablissement(etablissementID: string): Promise<UserDto[]>;
    findRadiologuesByEtablissement(etablissementID: string): Promise<UserDto[]>;
    searchUsers(query: string, requesterRole?: string): Promise<UserDto | UserDto[] | null>;
}
