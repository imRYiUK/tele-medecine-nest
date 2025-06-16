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
      await this.prisma.journalActivite.create({
        data: {
          utilisateurID: data.utilisateurID,
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