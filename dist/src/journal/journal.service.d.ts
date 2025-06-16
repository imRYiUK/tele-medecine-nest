import { PrismaService } from '../prisma/prisma.service';
export declare class JournalService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findByDateRange(startDate: Date, endDate: Date): Promise<({
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
