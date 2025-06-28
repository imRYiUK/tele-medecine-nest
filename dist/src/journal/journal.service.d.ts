import { PrismaService } from '../prisma/prisma.service';
export declare class JournalService {
    private prisma;
    constructor(prisma: PrismaService);
    private getUserEstablishment;
    findAll(requesterId: string, requesterRole: string): Promise<({
        utilisateur: {
            etablissementID: string | null;
            nom: string;
            email: string;
            prenom: string;
            role: string;
        };
    } & {
        description: string;
        etablissementID: string | null;
        utilisateurID: string;
        journalID: string;
        dateAction: Date;
        typeAction: string;
        ipAdresse: string | null;
    })[]>;
    findByUser(utilisateurID: string, requesterId: string, requesterRole: string): Promise<({
        utilisateur: {
            etablissementID: string | null;
            nom: string;
            email: string;
            prenom: string;
            role: string;
        };
    } & {
        description: string;
        etablissementID: string | null;
        utilisateurID: string;
        journalID: string;
        dateAction: Date;
        typeAction: string;
        ipAdresse: string | null;
    })[]>;
    findByDateRange(startDate: Date, endDate: Date, requesterId: string, requesterRole: string): Promise<({
        utilisateur: {
            etablissementID: string | null;
            nom: string;
            email: string;
            prenom: string;
            role: string;
        };
    } & {
        description: string;
        etablissementID: string | null;
        utilisateurID: string;
        journalID: string;
        dateAction: Date;
        typeAction: string;
        ipAdresse: string | null;
    })[]>;
    findByTypeAction(typeAction: string, requesterId: string, requesterRole: string): Promise<({
        utilisateur: {
            etablissementID: string | null;
            nom: string;
            email: string;
            prenom: string;
            role: string;
        };
    } & {
        description: string;
        etablissementID: string | null;
        utilisateurID: string;
        journalID: string;
        dateAction: Date;
        typeAction: string;
        ipAdresse: string | null;
    })[]>;
}
