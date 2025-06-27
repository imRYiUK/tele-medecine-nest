export declare class CreateImageMedicaleDto {
    examenID: string;
    studyInstanceUID: string;
    seriesInstanceUID: string;
    sopInstanceUID: string;
    dateAcquisition: string;
    modalite: string;
    description: string;
    url?: string | null;
    orthancInstanceId?: string | null;
}
