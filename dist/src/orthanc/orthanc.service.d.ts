import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class OrthancService {
    private readonly httpService;
    private readonly configService;
    private readonly baseUrl;
    private readonly auth;
    constructor(httpService: HttpService, configService: ConfigService);
    getStudies(): Promise<any>;
    getStudyDetails(studyId: string): Promise<any>;
    getSeries(studyId: string): Promise<any>;
    getSeriesDetails(seriesId: string): Promise<any>;
    getInstances(seriesId: string): Promise<any>;
    getInstanceDetails(instanceId: string): Promise<any>;
    getDicomFile(instanceId: string): Promise<any>;
    getInstancePreview(instanceId: string, quality?: number): Promise<any>;
    saveImageMetadata(examenId: string, orthancId: string, studyUid: string, modalite: string): Promise<{
        message: string;
        examenId: string;
        orthancId: string;
        studyUid: string;
        modalite: string;
    }>;
    uploadDicomFile(fileBuffer: Buffer): Promise<any>;
    findDicom(level: string, query: Record<string, any>): Promise<any>;
    getWadoImage(instanceId: string, contentType?: string): Promise<{
        data: any;
        headers: {
            'Content-Type': string;
            'Content-Length': any;
            'Cache-Control': string;
        };
    }>;
}
