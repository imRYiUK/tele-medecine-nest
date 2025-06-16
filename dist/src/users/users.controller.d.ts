import { UsersService } from './users.service';
import { Request } from 'express';
import { CreateUserDto, UpdateUserDto, UserDto } from '../common/dto/user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
    findOne(id: string): Promise<UserDto>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto>;
    remove(id: string): Promise<void>;
    getProfile(req: Request): Promise<UserDto>;
    updateProfile(req: Request, updateUserDto: UpdateUserDto): Promise<UserDto>;
}
