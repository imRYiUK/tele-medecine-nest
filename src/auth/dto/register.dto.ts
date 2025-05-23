import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsArray } from 'class-validator';
import { UserRole } from '../../users/user.entity';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsArray()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[] = [UserRole.PERSONNEL_ADMINISTRATIF]; // Default role is personnel administratif
}
