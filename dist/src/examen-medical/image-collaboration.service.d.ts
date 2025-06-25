import { PrismaService } from '../prisma/prisma.service';
export declare class ImageCollaborationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    inviteRadiologistToImage(imageID: string, inviterID: string, inviteeID: string): Promise<{
        createdAt: Date;
        id: string;
        imageID: string;
        inviterID: string;
        inviteeID: string;
    }>;
    listCollaborators(imageID: string): Promise<{
        etablissementID: string | null;
        nom: string;
        telephone: string;
        email: string;
        estActif: boolean;
        utilisateurID: string;
        prenom: string;
        username: string;
        password: string;
        role: string;
    }[]>;
}
