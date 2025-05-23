import { UsersService } from './users.service';
import { Request } from 'express';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: Request): Promise<{
        id: number;
        email: string;
        roles: import("./user.entity").UserRole[];
        lastLogin: Date | null;
    }>;
}
