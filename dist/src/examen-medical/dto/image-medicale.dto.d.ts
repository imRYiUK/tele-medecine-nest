export declare class ImageMedicaleDto {
    imageID: string;
    examenID: string;
    studyInstanceUID: string;
    seriesInstanceUID: string;
    sopInstanceUID: string;
    dateAcquisition: Date;
    modalite: string;
    description: string;
    url?: string | null;
    orthancInstanceId?: string | null;
}
