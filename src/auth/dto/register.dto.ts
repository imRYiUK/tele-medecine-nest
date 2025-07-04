import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/constants/roles';


export class RegisterDto {
  @ApiProperty({ description: 'Nom de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ description: 'Prénom de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @ApiProperty({ description: 'Nom d\'utilisateur unique' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Mot de passe' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Numéro de téléphone' })
  @IsString()
  @IsNotEmpty()
  telephone: string;

  @ApiProperty({ description: 'Rôle de l\'utilisateur'})
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({ description: 'ID de l\'établissement', required: false })
  @IsString()
  @IsOptional()
  etablissementID?: string;

  @ApiProperty({ description: 'État d\'activation du compte', default: true })
  @IsBoolean()
  @IsOptional()
  estActif?: boolean = true;
}
