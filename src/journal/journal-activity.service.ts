import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JournalActivityService {
  constructor(private prisma: PrismaService) {}

  async logActivity(data: {
    utilisateurID: string;
    typeAction: string;
    description: string;
    ipAdresse?: string;
  }) {
    try {
      // Get user's establishment ID
      const user = await this.prisma.utilisateur.findUnique({
        where: { utilisateurID: data.utilisateurID },
        select: { etablissementID: true }
      });

      await this.prisma.journalActivite.create({
        data: {
          utilisateurID: data.utilisateurID,
          etablissementID: user?.etablissementID,
          typeAction: data.typeAction,
          description: data.description,
          ipAdresse: data.ipAdresse,
          dateAction: new Date()
        }
      });
    } catch (error) {
      // On ne veut pas que l'échec de journalisation bloque l'action principale
      console.error('Erreur lors de la journalisation de l\'activité:', error);
    }
  }
} 