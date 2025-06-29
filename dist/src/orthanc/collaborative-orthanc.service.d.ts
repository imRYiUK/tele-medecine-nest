import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class CollaborativeOrthancService {
    private readonly httpService;
    private readonly configService;
    private readonly prisma;
    private readonly logger;
    constructor(httpService: HttpService, configService: ConfigService, prisma: PrismaService);
    getCollaborativeImagePreview(sopInstanceUID: string, userId: string, quality?: number): Promise<Buffer>;
    getCollaborativeDicomFile(sopInstanceUID: string, userId: string): Promise<Buffer>;
    private checkUserAccessToImage;
    private getOrthancConfigForImageOwner;
    private getOrthancConfigForUser;
    private getImagePreviewFromOrthanc;
    private getDicomFileFromOrthanc;
    private getAuthHeaders;
}
