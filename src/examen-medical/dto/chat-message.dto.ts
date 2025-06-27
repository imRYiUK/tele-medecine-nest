import { ApiProperty } from '@nestjs/swagger';

export class CreateChatMessageDto {
  @ApiProperty()
  imageID: string;

  @ApiProperty()
  content: string;
}

export class ChatMessageDto {
  @ApiProperty()
  messageID: string;

  @ApiProperty()
  imageID: string;

  @ApiProperty()
  senderID: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  timestamp: string;
} 