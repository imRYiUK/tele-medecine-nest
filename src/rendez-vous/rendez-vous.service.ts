import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RendezVousDto } from './dto/rendez-vous.dto';

@Injectable()
export class RendezVousService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    dateHeure: string | Date;
    motif?: string;
    patientID: string;
    medecinID: string;
    createdByID: string;
  }) {
    // Correction du format dateHeure
    let dateHeure = data.dateHeure;
    if (typeof dateHeure === 'string') {
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateHeure)) {
        dateHeure += ':00';
      }
      dateHeure = new Date(dateHeure);
    }
    // Vérifier la disponibilité du médecin
    const conflits = await this.prisma.rendezVous.findFirst({
      where: {
        medecinID: data.medecinID,
        dateHeure: dateHeure,
      },
    });
    if (conflits) {
      throw new BadRequestException('Le médecin a déjà un rendez-vous à cette date/heure.');
    }
    // (Optionnel) Vérifier que la date/heure est dans les horaires du médecin
    // ...
    const created = await this.prisma.rendezVous.create({
      data: { ...data, dateHeure },
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
        // createdBy: { select: { nom: true, prenom: true } },
      },
      orderBy: { dateHeure: 'asc' },
    });
    return results.map(rdv => new RendezVousDto(rdv));
  }

  async findByMedecin(medecinID: string) {
    const results = await this.prisma.rendezVous.findMany({
      where: { medecinID },
      include: {
        patient: { select: { patientID: true, nom: true, prenom: true } },
      },
      orderBy: { dateHeure: 'asc' },
    });
    return results.map(rdv => new RendezVousDto(rdv));
  }

  async findByPatient(patientID: string) {
    const results = await this.prisma.rendezVous.findMany({
      where: { patientID },
      include: {
        medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
      },
      orderBy: { dateHeure: 'asc' },
    });
    return results.map(rdv => new RendezVousDto(rdv));
  }

  async update(id: string, data: Partial<{ dateHeure: string | Date; motif: string; medecinID: string }>) {
    const rendezVous = await this.prisma.rendezVous.findUnique({ where: { rendezVousID: id } });
    if (!rendezVous) throw new NotFoundException('Rendez-vous non trouvé');
    // Déterminer le nouveau medecinID et la nouvelle dateHeure
    const newMedecinID = data.medecinID ?? rendezVous.medecinID;
    let newDateHeure = data.dateHeure ?? rendezVous.dateHeure;
    if (typeof newDateHeure === 'string') {
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(newDateHeure)) {
        newDateHeure += ':00';
      }
      newDateHeure = new Date(newDateHeure);
    }
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
    const updated = await this.prisma.rendezVous.update({
      where: { rendezVousID: id },
      data: { ...data, dateHeure: newDateHeure },
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