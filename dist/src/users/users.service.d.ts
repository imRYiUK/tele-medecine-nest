import { PrismaService } from '../prisma/prisma.service';
import { UserDto, CreateUserDto, UpdateUserDto } from '../common/dto/user.dto';
import { JournalActivityService } from '../journal/journal-activity.service';
export declare class UsersService {
    private prisma;
    private journalActivityService;
    constructor(prisma: PrismaService, journalActivityService: JournalActivityService);
    create(createUserDto: CreateUserDto, adminId: string): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
    findOne(utilisateurID: string): Promise<UserDto>;
    findById(userId: string): Promise<UserDto>;
    update(utilisateurID: string, updateUserDto: UpdateUserDto, adminId: string): Promise<UserDto>;
    remove(utilisateurID: string, adminId: string): Promise<void>;
    getProfile(userId: string): Promise<UserDto>;
    updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto>;
}
