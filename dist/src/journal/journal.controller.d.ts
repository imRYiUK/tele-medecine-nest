import { JournalService } from './journal.service';
export declare class JournalController {
    private readonly journalService;
    constructor(journalService: JournalService);
    findAll(req: any): Promise<({
        utilisateur: {
            nom: string;
            prenom: string;
            email: string;
            role: string;
            etablissementID: string | null;
        };
    } & {
        description: string;
        utilisateurID: string;
        etablissementID: string | null;
        journalID: string;
        dateAction: Date;
        typeAction: string;
        ipAdresse: string | null;
    })[]>;
    findByUser(utilisateurID: string, req: any): Promise<({
        utilisateur: {
            nom: string;
            prenom: string;
            email: string;
            role: string;
            etablissementID: string | null;
        };
    } & {
        description: string;
        utilisateurID: string;
        etablissementID: string | null;
        journalID: string;
        dateAction: Date;
        typeAction: string;
        ipAdresse: string | null;
    })[]>;
    findByDateRange(startDate: string, endDate: string, req: any): Promise<({
        utilisateur: {
            nom: string;
            prenom: string;
            email: string;
            role: string;
            etablissementID: string | null;
        };
    } & {
        description: string;
        utilisateurID: string;
        etablissementID: string | null;
        journalID: string;
        dateAction: Date;
        typeAction: string;
        ipAdresse: string | null;
    })[]>;
    findByTypeAction(typeAction: string, req: any): Promise<({
        utilisateur: {
            nom: string;
            prenom: string;
            email: string;
            role: string;
            etablissementID: string | null;
        };
    } & {
        description: string;
        utilisateurID: string;
        etablissementID: string | null;
        journalID: string;
        dateAction: Date;
        typeAction: string;
        ipAdresse: string | null;
    })[]>;
}
