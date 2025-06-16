import { PrismaService } from '../prisma/prisma.service';
import { UserDto, CreateUserDto, UpdateUserDto } from '../common/dto/user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
    findOne(utilisateurID: string): Promise<UserDto>;
    findById(userId: string): Promise<UserDto>;
    update(utilisateurID: string, updateUserDto: UpdateUserDto): Promise<UserDto>;
    remove(utilisateurID: string): Promise<void>;
    getProfile(userId: string): Promise<UserDto>;
    updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto>;
}
