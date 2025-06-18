import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RendezVousService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    dateHeure: Date;
    motif?: string;
    patientID: string;
    medecinID: string;
    createdByID: string;
  }) {
    // Vérifier la disponibilité du médecin
    const conflits = await this.prisma.rendezVous.findFirst({
      where: {
        medecinID: data.medecinID,
        dateHeure: data.dateHeure,
      },
    });
    if (conflits) {
      throw new BadRequestException('Le médecin a déjà un rendez-vous à cette date/heure.');
    }
    // (Optionnel) Vérifier que la date/heure est dans les horaires du médecin
    // ...
    return this.prisma.rendezVous.create({ data });
  }

  async findAll() {
    return this.prisma.rendezVous.findMany({
      include: {
        patient: { select: { nom: true, prenom: true } },
        medecin: { select: { nom: true, prenom: true, email: true } },
        createdBy: { select: { nom: true, prenom: true } },
      },
      orderBy: { dateHeure: 'asc' },
    });
  }

  async findByMedecin(medecinID: string) {
    return this.prisma.rendezVous.findMany({
      where: { medecinID },
      include: {
        patient: { select: { nom: true, prenom: true } },
      },
      orderBy: { dateHeure: 'asc' },
    });
  }

  async findByPatient(patientID: string) {
    return this.prisma.rendezVous.findMany({
      where: { patientID },
      include: {
        medecin: { select: { nom: true, prenom: true, email: true } },
      },
      orderBy: { dateHeure: 'asc' },
    });
  }

  async update(id: string, data: Partial<{ dateHeure: Date; motif: string; medecinID: string }>) {
    const rendezVous = await this.prisma.rendezVous.findUnique({ where: { rendezVousID: id } });
    if (!rendezVous) throw new NotFoundException('Rendez-vous non trouvé');

    // Déterminer le nouveau medecinID et la nouvelle dateHeure
    const newMedecinID = data.medecinID ?? rendezVous.medecinID;
    const newDateHeure = data.dateHeure ?? rendezVous.dateHeure;

    // Vérifier les conflits pour le nouveau médecin à la nouvelle date/heure
    const conflits = await this.prisma.rendezVous.findFirst({
      where: {
        medecinID: newMedecinID,
        dateHeure: newDateHeure,
        NOT: { rendezVousID: id },
      },
    });
    if (conflits) {
      throw new BadRequestException('Le médecin a déjà un rendez-vous à cette date/heure.');
    }

    return this.prisma.rendezVous.update({ where: { rendezVousID: id }, data });
  }

  async remove(id: string) {
    return this.prisma.rendezVous.delete({ where: { rendezVousID: id } });
  }
} 