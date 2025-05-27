import { FindDicomDto } from './dto/find-dicom.dto';
import { OrthancService } from './orthanc.service';
import { Response } from 'express';
export declare class OrthancController {
    private readonly orthancService;
    constructor(orthancService: OrthancService);
    getStudies(): Promise<{
        success: boolean;
        data: any;
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getStudyDetails(studyId: string): Promise<{
        success: boolean;
        data: any;
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getSeries(studyId: string): Promise<{
        success: boolean;
        data: any;
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getSeriesDetails(seriesId: string): Promise<{
        success: boolean;
        data: any;
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getInstances(seriesId: string): Promise<{
        success: boolean;
        data: any;
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getInstanceDetails(instanceId: string): Promise<{
        success: boolean;
        data: any;
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getDicomFile(instanceId: string, res: Response): Promise<void>;
    getInstancePreview(instanceId: string, quality: string, res: Response): Promise<void>;
    saveImageMetadata(examenId: string, orthancId: string, studyUid: string, modalite: string): Promise<{
        success: boolean;
        data: {
            message: string;
            examenId: string;
            orthancId: string;
            studyUid: string;
            modalite: string;
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    uploadDicomFile(file: Express.Multer.File): Promise<{
        success: boolean;
        data: any;
    }>;
    findDicom(findRequest: FindDicomDto): Promise<{
        success: boolean;
        data: any;
    }>;
    getWadoImage(instanceId: string, contentType: string, res: Response): Promise<void>;
}
