import { JournalService } from './journal.service';
export declare class JournalController {
    private readonly journalService;
    constructor(journalService: JournalService);
    findAll(req: any): Promise<({
        utilisateur: {
            etablissementID: string | null;
            nom: string;
            email: string;
            prenom: string;
            role: string;
        };
    } & {
        description: string;
        utilisateurID: string;
        journalID: string;
        dateAction: Date;
        typeAction: string;
        ipAdresse: string | null;
    })[]>;
    findByUser(utilisateurID: string, req: any): Promise<({
        utilisateur: {
            etablissementID: string | null;
            nom: string;
            email: string;
            prenom: string;
            role: string;
        };
    } & {
        description: string;
        utilisateurID: string;
        journalID: string;
        dateAction: Date;
        typeAction: string;
        ipAdresse: string | null;
    })[]>;
    findByDateRange(startDate: string, endDate: string, req: any): Promise<({
        utilisateur: {
            etablissementID: string | null;
            nom: string;
            email: string;
            prenom: string;
            role: string;
        };
    } & {
        description: string;
        utilisateurID: string;
        journalID: string;
        dateAction: Date;
        typeAction: string;
        ipAdresse: string | null;
    })[]>;
    findByTypeAction(typeAction: string, req: any): Promise<({
        utilisateur: {
            etablissementID: string | null;
            nom: string;
            email: string;
            prenom: string;
            role: string;
        };
    } & {
        description: string;
        utilisateurID: string;
        journalID: string;
        dateAction: Date;
        typeAction: string;
        ipAdresse: string | null;
    })[]>;
}
