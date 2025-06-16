import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JournalService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.journalActivite.findMany({
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        dateAction: 'desc'
      }
    });
  }

  async findByUser(utilisateurID: string) {
    return this.prisma.journalActivite.findMany({
      where: {
        utilisateurID
      },
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        dateAction: 'desc'
      }
    });
  }

  async findByDateRange(startDate: Date, endDate: Date) {
    return this.prisma.journalActivite.findMany({
      where: {
        dateAction: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        dateAction: 'desc'
      }
    });
  }

  async findByTypeAction(typeAction: string) {
    return this.prisma.journalActivite.findMany({
      where: {
        typeAction
      },
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        dateAction: 'desc'
      }
    });
  }
} 