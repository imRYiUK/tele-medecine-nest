import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '../common/constants/roles';
import { Prisma } from '@prisma/client';

@Injectable()
export class JournalService {
  constructor(private prisma: PrismaService) {}

  private async getUserEstablishment(utilisateurID: string) {
    const user = await this.prisma.utilisateur.findUnique({
      where: { utilisateurID },
      select: { etablissementID: true }
    });
    return user?.etablissementID;
  }

  async findAll(requesterId: string, requesterRole: string) {
    const baseQuery = {
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            role: true,
            etablissementID: true
          }
        }
      },
      orderBy: {
        dateAction: Prisma.SortOrder.desc
      }
    };

    if (requesterRole === UserRole.SUPER_ADMIN) {
      return this.prisma.journalActivite.findMany(baseQuery);
    }

    const requesterEstablishment = await this.getUserEstablishment(requesterId);
    if (!requesterEstablishment) {
      throw new UnauthorizedException('User has no associated establishment');
    }

    return this.prisma.journalActivite.findMany({
      ...baseQuery,
      where: {
        utilisateur: {
          etablissementID: requesterEstablishment
        }
      }
    });
  }

  async findByUser(utilisateurID: string, requesterId: string, requesterRole: string) {
    const baseQuery = {
      where: { utilisateurID },
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            role: true,
            etablissementID: true
          }
        }
      },
      orderBy: {
        dateAction: Prisma.SortOrder.desc
      }
    };

    if (requesterRole === UserRole.SUPER_ADMIN) {
      return this.prisma.journalActivite.findMany(baseQuery);
    }

    const requesterEstablishment = await this.getUserEstablishment(requesterId);
    if (!requesterEstablishment) {
      throw new UnauthorizedException('User has no associated establishment');
    }

    const targetUser = await this.prisma.utilisateur.findUnique({
      where: { utilisateurID },
      select: { etablissementID: true }
    });

    if (targetUser?.etablissementID !== requesterEstablishment) {
      throw new UnauthorizedException('Cannot access logs from users outside your establishment');
    }

    return this.prisma.journalActivite.findMany(baseQuery);
  }

  async findByDateRange(startDate: Date, endDate: Date, requesterId: string, requesterRole: string) {
    const baseQuery = {
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
            role: true,
            etablissementID: true
          }
        }
      },
      orderBy: {
        dateAction: Prisma.SortOrder.desc
      }
    };

    if (requesterRole === UserRole.SUPER_ADMIN) {
      return this.prisma.journalActivite.findMany(baseQuery);
    }

    const requesterEstablishment = await this.getUserEstablishment(requesterId);
    if (!requesterEstablishment) {
      throw new UnauthorizedException('User has no associated establishment');
    }

    return this.prisma.journalActivite.findMany({
      ...baseQuery,
      where: {
        ...baseQuery.where,
        utilisateur: {
          etablissementID: requesterEstablishment
        }
      }
    });
  }

  async findByTypeAction(typeAction: string, requesterId: string, requesterRole: string) {
    const baseQuery = {
      where: { typeAction },
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            role: true,
            etablissementID: true
          }
        }
      },
      orderBy: {
        dateAction: Prisma.SortOrder.desc
      }
    };

    if (requesterRole === UserRole.SUPER_ADMIN) {
      return this.prisma.journalActivite.findMany(baseQuery);
    }

    const requesterEstablishment = await this.getUserEstablishment(requesterId);
    if (!requesterEstablishment) {
      throw new UnauthorizedException('User has no associated establishment');
    }

    return this.prisma.journalActivite.findMany({
      ...baseQuery,
      where: {
        ...baseQuery.where,
        utilisateur: {
          etablissementID: requesterEstablishment
        }
      }
    });
  }
} 