import { JournalService } from './journal.service';
export declare class JournalController {
    private readonly journalService;
    constructor(journalService: JournalService);
    findAll(): Promise<({
        utilisateur: {
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
    findByUser(utilisateurID: string): Promise<({
        utilisateur: {
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
    findByDateRange(startDate: string, endDate: string): Promise<({
        utilisateur: {
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
    findByTypeAction(typeAction: string): Promise<({
        utilisateur: {
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
