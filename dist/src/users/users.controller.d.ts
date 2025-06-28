import { UsersService } from './users.service';
import { Request } from 'express';
import { CreateUserDto, UpdateUserDto, UserDto } from '../common/dto/user.dto';
export declare class UsersController {
    private usersService;
    private readonly logger;
    constructor(usersService: UsersService);
    private getUserId;
    private getUserRole;
    private validateRoleHierarchy;
    create(createUserDto: CreateUserDto, req: Request): Promise<UserDto>;
    findAll(req: Request): Promise<UserDto[]>;
    searchUsers(query: string, req: Request): Promise<UserDto | UserDto[]>;
    testSearchUsers(query: string): Promise<UserDto | UserDto[]>;
    findOne(id: string, req: Request): Promise<UserDto>;
    update(id: string, updateUserDto: UpdateUserDto, req: Request): Promise<{
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
    remove(id: string, req: Request): Promise<void>;
    getProfile(req: Request): Promise<UserDto>;
    updateProfile(req: Request, updateUserDto: UpdateUserDto): Promise<{
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
}
