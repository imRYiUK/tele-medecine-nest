export declare class CreateConsultationMedicaleDto {
    dossierID: string;
    patientID: string;
    dateConsultation: Date;
    motif: string;
    diagnostics: string;
    observations: string;
    traitementPrescrit: string;
    estTelemedicine?: boolean;
    lienVisio?: string;
}
