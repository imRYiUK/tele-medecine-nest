import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @IsBoolean()
  @IsOptional()
  estLu?: boolean;
} 