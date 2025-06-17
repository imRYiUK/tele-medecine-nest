declare class CreatePrescriptionDto {
    medicamentID: string;
    posologie: string;
    duree: string;
    instructions: string;
}
declare class CreateOrdonnanceDto {
    prescriptions: CreatePrescriptionDto[];
}
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
    ordonnance?: CreateOrdonnanceDto;
}
export {};
