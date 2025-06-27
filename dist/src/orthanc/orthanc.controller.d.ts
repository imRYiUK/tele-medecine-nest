import { FindDicomDto } from './dto/find-dicom.dto';
import { OrthancService } from './orthanc.service';
import { Response } from 'express';
import { Request } from 'express';
export declare class OrthancController {
    private readonly orthancService;
    constructor(orthancService: OrthancService);
    private getUserId;
    getStudies(req: Request): Promise<{
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
    getStudyDetails(studyId: string, req: Request): Promise<{
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
    getSeries(studyId: string, req: Request): Promise<{
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
    getSeriesDetails(seriesId: string, req: Request): Promise<{
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
    getInstances(seriesId: string, req: Request): Promise<{
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
    getInstanceDetails(instanceId: string, req: Request): Promise<{
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
    getDicomFile(instanceId: string, res: Response, req: Request): Promise<void>;
    getInstancePreview(instanceId: string, quality: string, res: Response, req: Request): Promise<void>;
    saveImageMetadata(examenId: string, orthancId: string, studyUid: string, modalite: string): Promise<{
        success: boolean;
        data: {
            description: string;
            examenID: string;
            url: string | null;
            imageID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
            orthancInstanceId: string | null;
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    uploadDicomFile(file: Express.Multer.File, req: Request): Promise<{
        success: boolean;
        data: any;
    }>;
    findDicom(findRequest: FindDicomDto, req: Request): Promise<{
        success: boolean;
        data: any;
    }>;
    getWadoImage(instanceId: string, contentType: string, res: Response, req: Request): Promise<void>;
}
