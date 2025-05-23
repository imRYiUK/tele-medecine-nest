import { UserRole } from '../../users/user.entity';
export declare class RegisterDto {
    email: string;
    password: string;
    roles: UserRole[];
}
