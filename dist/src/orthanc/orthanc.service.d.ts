import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JournalActivityService } from '../journal/journal-activity.service';
export declare class OrthancService {
    private readonly httpService;
    private readonly configService;
    private readonly journalActivityService;
    private readonly baseUrl;
    private readonly auth;
    constructor(httpService: HttpService, configService: ConfigService, journalActivityService: JournalActivityService);
    getStudies(userId: string): Promise<any>;
    getStudyDetails(studyId: string, userId: string): Promise<any>;
    getSeries(studyId: string, userId: string): Promise<any>;
    getSeriesDetails(seriesId: string, userId: string): Promise<any>;
    getInstances(seriesId: string, userId: string): Promise<any>;
    getInstanceDetails(instanceId: string, userId: string): Promise<any>;
    getDicomFile(instanceId: string, userId: string): Promise<any>;
    getInstancePreview(instanceId: string, userId: string, quality?: number): Promise<any>;
    saveImageMetadata(examenId: string, orthancId: string, studyUid: string, modalite: string): Promise<{
        message: string;
        examenId: string;
        orthancId: string;
        studyUid: string;
        modalite: string;
    }>;
    uploadDicomFile(fileBuffer: Buffer, userId: string): Promise<any>;
    findDicom(level: string, query: Record<string, any>, userId: string): Promise<any>;
    getWadoImage(instanceId: string, contentType: string | undefined, userId: string): Promise<{
        data: any;
        headers: {
            'Content-Type': string;
            'Content-Length': any;
            'Cache-Control': string;
        };
    }>;
}
