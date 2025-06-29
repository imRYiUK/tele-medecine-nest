import { Response } from 'express';
import { Request } from 'express';
import { CollaborativeOrthancService } from './collaborative-orthanc.service';
export declare class CollaborativeOrthancController {
    private readonly collaborativeOrthancService;
    constructor(collaborativeOrthancService: CollaborativeOrthancService);
    private getUserId;
    getCollaborativeImagePreview(sopInstanceUID: string, quality: string, res: Response, req: Request): Promise<void>;
    getCollaborativeDicomFile(sopInstanceUID: string, res: Response, req: Request): Promise<void>;
}
