import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class OrthancService {
    private readonly httpService;
    private readonly configService;
    private readonly prisma;
    private readonly orthancUrl;
    private readonly orthancUsername;
    private readonly orthancPassword;
    constructor(httpService: HttpService, configService: ConfigService, prisma: PrismaService);
    private getOrthancConfigForUser;
    private getAuthHeaders;
    getStudies(userId: string): Promise<any>;
    getStudyDetails(studyId: string, userId: string): Promise<any>;
    getSeries(studyId: string, userId: string): Promise<any>;
    getSeriesDetails(seriesId: string, userId: string): Promise<any>;
    getInstances(seriesId: string, userId: string): Promise<any>;
    getInstanceDetails(instanceId: string, userId: string): Promise<any>;
    getDicomFile(instanceId: string, userId: string): Promise<any>;
    getInstancePreview(instanceId: string, userId: string, quality?: number): Promise<any>;
    uploadDicomFile(fileBuffer: Buffer, userId: string): Promise<any>;
    findDicom(level: string, query: any, userId: string): Promise<any>;
    getWadoImage(instanceId: string, contentType: string, userId: string): Promise<{
        data: Buffer;
        headers: Record<string, string>;
    }>;
    saveImageMetadata(examenId: string, orthancId: string, studyUid: string, modalite: string): Promise<{
        description: string;
        examenID: string;
        imageID: string;
        studyInstanceUID: string;
        seriesInstanceUID: string;
        sopInstanceUID: string;
        dateAcquisition: Date;
        modalite: string;
    }>;
}
