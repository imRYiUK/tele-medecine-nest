import { ImageCollaborationService } from './image-collaboration.service';
export declare class ImageCollaborationController {
    private readonly collaborationService;
    constructor(collaborationService: ImageCollaborationService);
    invite(imageID: string, inviteeID: string, req: any): Promise<{
        createdAt: Date;
        id: string;
        imageID: string;
        inviterID: string;
        inviteeID: string;
    }>;
    collaborators(imageID: string): Promise<{
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
