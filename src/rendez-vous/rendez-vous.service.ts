import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RendezVousDto } from './dto/rendez-vous.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RendezVousService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    private usersService: UsersService,
  ) {}

  async create(data: {
    date: string;
    debutTime: string;
    endTime: string;
    motif?: string;
    patientID: string;
    medecinID: string;
    createdByID: string;
  }) {
    // Vérifier la disponibilité du médecin pour le créneau
    const conflits = await this.prisma.rendezVous.findFirst({
      where: {
        medecinID: data.medecinID,
        date: data.date,
        AND: [
          { debutTime: { lt: data.endTime } },
          { endTime: { gt: data.debutTime } },
        ],
      },
    });
    if (conflits) {
      throw new BadRequestException('Le médecin a déjà un rendez-vous à ce créneau.');
    }
    const created = await this.prisma.rendezVous.create({
      data,
      include: {
        patient: { select: { patientID: true, nom: true, prenom: true } },
        medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
      },
    });

    // Fetch the recipient's role
    let lien = '/rendez-vous';
    try {
      const recipient = await this.usersService.findOne(data.medecinID);
      if (recipient.role === 'RADIOLOGUE') {
        lien = '/radiologue/rendez-vous';
      } else if (recipient.role === 'MEDECIN') {
        lien = '/medecin/rendez-vous';
      }
    } catch (e) {
      // fallback to default lien
    }

    // Create notification for the medecin/radiologue
    try {
      await this.notificationsService.create({
        destinataires: [data.medecinID],
        titre: 'Nouveau Rendez-vous',
        message: `Un nouveau rendez-vous a été créé pour ${created.patient.nom} ${created.patient.prenom} le ${data.date} de ${data.debutTime} à ${data.endTime}. Motif: ${data.motif || 'Non spécifié'}`,
        type: 'RENDEZ_VOUS_CREATED',
        lien,
      }, data.createdByID);
    } catch (error) {
      // Log the error but don't fail the rendez-vous creation
      console.error('Failed to create notification:', error);
    }

    return new RendezVousDto(created);
  }

  async findAll() {
    const results = await this.prisma.rendezVous.findMany({
      include: {
        patient: { select: { patientID: true, nom: true, prenom: true } },
        medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
      },
      orderBy: [
        { date: 'asc' as const },
        { debutTime: 'asc' as const },
      ],
    });
    return results.map(rdv => new RendezVousDto(rdv));
  }

  async findByMedecin(medecinID: string) {
    const results = await this.prisma.rendezVous.findMany({
      where: { medecinID },
      include: {
        patient: { select: { patientID: true, nom: true, prenom: true } },
      },
      orderBy: [
        { date: 'asc' as const },
        { debutTime: 'asc' as const },
      ],
    });
    return results.map(rdv => new RendezVousDto(rdv));
  }

  async findByPatient(patientID: string) {
    const results = await this.prisma.rendezVous.findMany({
      where: { patientID },
      include: {
        medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
      },
      orderBy: [
        { date: 'asc' as const },
        { debutTime: 'asc' as const },
      ],
    });
    return results.map(rdv => new RendezVousDto(rdv));
  }

  async update(id: string, data: Partial<{ date: string; debutTime: string; endTime: string; motif: string; medecinID: string }>) {
    const rendezVous = await this.prisma.rendezVous.findUnique({ where: { rendezVousID: id } });
    if (!rendezVous) throw new NotFoundException('Rendez-vous non trouvé');
    const newMedecinID = data.medecinID ?? rendezVous.medecinID;
    const newDate = data.date ?? rendezVous.date;
    const newDebutTime = data.debutTime ?? rendezVous.debutTime;
    const newEndTime = data.endTime ?? rendezVous.endTime;
    // Vérifier les conflits pour le nouveau médecin à la nouvelle date/créneau
    const conflits = await this.prisma.rendezVous.findFirst({
      where: {
        medecinID: newMedecinID,
        date: newDate,
        AND: [
          { debutTime: { lt: newEndTime } },
          { endTime: { gt: newDebutTime } },
        ],
        NOT: { rendezVousID: id },
      },
    });
    if (conflits) {
      throw new BadRequestException('Le médecin a déjà un rendez-vous à ce créneau.');
    }
    const updated = await this.prisma.rendezVous.update({
      where: { rendezVousID: id },
      data: {
        ...data,
        date: newDate,
        debutTime: newDebutTime,
        endTime: newEndTime,
        medecinID: newMedecinID,
      },
      include: {
        patient: { select: { patientID: true, nom: true, prenom: true } },
        medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
      },
    });

    // Create notification for the medecin/radiologue about the update
    try {
      await this.notificationsService.create({
        destinataires: [newMedecinID],
        titre: 'Rendez-vous Modifié',
        message: `Le rendez-vous pour ${updated.patient.nom} ${updated.patient.prenom} a été modifié. Nouvelle date: ${newDate} de ${newDebutTime} à ${newEndTime}. Motif: ${data.motif || updated.motif || 'Non spécifié'}`,
        type: 'RENDEZ_VOUS_UPDATED',
        lien: `/rendez-vous`,
      }, 'system'); // Using 'system' as createdByID for updates
    } catch (error) {
      // Log the error but don't fail the rendez-vous update
      console.error('Failed to create update notification:', error);
    }

    return new RendezVousDto(updated);
  }

  async remove(id: string) {
    // Get the rendez-vous details before deletion for notification
    const rendezVous = await this.prisma.rendezVous.findUnique({
      where: { rendezVousID: id },
      include: {
        patient: { select: { patientID: true, nom: true, prenom: true } },
        medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
      },
    });

    if (!rendezVous) {
      throw new NotFoundException('Rendez-vous non trouvé');
    }

    const deleted = await this.prisma.rendezVous.delete({
      where: { rendezVousID: id },
      include: {
        patient: { select: { patientID: true, nom: true, prenom: true } },
        medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
      },
    });

    // Create notification for the medecin/radiologue about the deletion
    try {
      await this.notificationsService.create({
        destinataires: [deleted.medecin.utilisateurID],
        titre: 'Rendez-vous Annulé',
        message: `Le rendez-vous pour ${deleted.patient.nom} ${deleted.patient.prenom} prévu le ${deleted.date} de ${deleted.debutTime} à ${deleted.endTime} a été annulé.`,
        type: 'RENDEZ_VOUS_CANCELLED',
        lien: `/rendez-vous`,
      }, 'system'); // Using 'system' as createdByID for deletions
    } catch (error) {
      // Log the error but don't fail the rendez-vous deletion
      console.error('Failed to create deletion notification:', error);
    }

    return new RendezVousDto(deleted);
  }
} 