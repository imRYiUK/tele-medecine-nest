import { IsString, IsEmail, IsBoolean, IsOptional, IsUUID, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'Unique identifier of the user' })
  @IsUUID()
  utilisateurID: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsString()
  nom: string;

  @ApiProperty({ description: 'First name of the user' })
  @IsString()
  prenom: string;

  @ApiProperty({ description: 'Username of the user' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ description: 'Email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone number of the user' })
  @IsString()
  telephone: string;

  @ApiProperty({ description: 'Role of the user in the system' })
  @IsString()
  role: string;

  @ApiProperty({ description: 'ID of the establishment the user belongs to', required: false })
  @IsOptional()
  @IsUUID()
  etablissementID?: string | null;

  @ApiProperty({ description: 'Whether the user account is active' })
  @IsBoolean()
  estActif: boolean;
}

export class CreateUserDto {
  @ApiProperty({ description: 'Last name of the user' })
  @IsString()
  nom: string;

  @ApiProperty({ description: 'First name of the user' })
  @IsString()
  prenom: string;

  @ApiProperty({ description: 'Username of the user' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone number of the user' })
  @IsString()
  telephone: string;

  @ApiProperty({ description: 'Role of the user in the system' })
  @IsString()
  role: string;

  @ApiProperty({ description: 'ID of the establishment the user belongs to', required: false })
  @IsOptional()
  @IsUUID()
  etablissementID?: string;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'Last name of the user', required: false })
  @IsOptional()
  @IsString()
  nom?: string;

  @ApiProperty({ description: 'First name of the user', required: false })
  @IsOptional()
  @IsString()
  prenom?: string;

  @ApiProperty({ description: 'Username of the user', required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;

  @ApiProperty({ description: 'Email address of the user', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Phone number of the user', required: false })
  @IsOptional()
  @IsString()
  telephone?: string;

  @ApiProperty({ description: 'Role of the user in the system', required: false })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ description: 'ID of the establishment the user belongs to', required: false })
  @IsOptional()
  @IsUUID()
  etablissementID?: string;

  @ApiProperty({ description: 'Whether the user account is active', required: false })
  @IsOptional()
  @IsBoolean()
  estActif?: boolean;
}
