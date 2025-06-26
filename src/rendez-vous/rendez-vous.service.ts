import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RendezVousDto } from './dto/rendez-vous.dto';

@Injectable()
export class RendezVousService {
  constructor(private prisma: PrismaService) {}

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
    return new RendezVousDto(updated);
  }

  async remove(id: string) {
    const deleted = await this.prisma.rendezVous.delete({
      where: { rendezVousID: id },
      include: {
        patient: { select: { patientID: true, nom: true, prenom: true } },
        medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
      },
    });
    return new RendezVousDto(deleted);
  }
} 