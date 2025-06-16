import { UsersService } from './users.service';
import { Request } from 'express';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: Request): Promise<{
        userId: string;
        nom: string;
        prenom: string;
        email: string;
        role: string;
    }>;
}
