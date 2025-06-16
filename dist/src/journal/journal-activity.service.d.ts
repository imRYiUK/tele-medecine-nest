import { PrismaService } from '../prisma/prisma.service';
export declare class JournalActivityService {
    private prisma;
    constructor(prisma: PrismaService);
    logActivity(data: {
        utilisateurID: string;
        typeAction: string;
        description: string;
        ipAdresse?: string;
    }): Promise<void>;
}
