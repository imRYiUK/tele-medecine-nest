import { UsersService } from './users.service';
import { Request } from 'express';
import { CreateUserDto, UpdateUserDto, UserDto } from '../common/dto/user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    private getUserId;
    private getUserRole;
    private validateRoleHierarchy;
    create(createUserDto: CreateUserDto, req: Request): Promise<UserDto>;
    findAll(req: Request): Promise<UserDto[]>;
    findOne(id: string, req: Request): Promise<UserDto>;
    update(id: string, updateUserDto: UpdateUserDto, req: Request): Promise<{
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
    remove(id: string, req: Request): Promise<void>;
    getProfile(req: Request): Promise<UserDto>;
    updateProfile(req: Request, updateUserDto: UpdateUserDto): Promise<{
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
