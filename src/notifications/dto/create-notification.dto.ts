import { IsString, IsNotEmpty, IsOptional, IsArray, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  destinataires: string[]; // Array of user IDs

  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  lien?: string;
} 