import { UsersService } from './users.service';
import { Request } from 'express';
import { CreateUserDto, UpdateUserDto, UserDto } from '../common/dto/user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    private getUserId;
    create(createUserDto: CreateUserDto, req: Request): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
    findOne(id: string): Promise<UserDto>;
    update(id: string, updateUserDto: UpdateUserDto, req: Request): Promise<UserDto>;
    remove(id: string, req: Request): Promise<void>;
    getProfile(req: Request): Promise<UserDto>;
    updateProfile(req: Request, updateUserDto: UpdateUserDto): Promise<UserDto>;
}
