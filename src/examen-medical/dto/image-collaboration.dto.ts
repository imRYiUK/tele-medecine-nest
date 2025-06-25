import { ApiProperty } from '@nestjs/swagger';

export class ImageCollaborationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  imageID: string;

  @ApiProperty()
  inviterID: string;

  @ApiProperty()
  inviteeID: string;

  @ApiProperty()
  createdAt: Date;
}

export class CollaboratorDto {
  @ApiProperty()
  utilisateurID: string;

  @ApiProperty()
  nom: string;

  @ApiProperty()
  prenom: string;

  @ApiProperty()
  email: string;
} 