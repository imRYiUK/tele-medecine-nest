import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamenMedicalDto } from './dto/create-examen-medical.dto';
import { UpdateExamenMedicalDto } from './dto/update-examen-medical.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ExamenMedicalService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(createExamenMedicalDto: CreateExamenMedicalDto, demandeParID: string) {
    const examen = await this.prisma.examenMedical.create({
      data: {
        ...createExamenMedicalDto,
        demandeParID,
      },
      include: {
        patient: {
          select: {
            nom: true,
            prenom: true,
            dateNaissance: true,
          },
        },
        typeExamen: true,
        demandePar: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
      },
    });

    // Notifier le demandeur
    await this.notificationsService.create({
      utilisateurID: demandeParID,
      titre: 'Nouvel examen médical créé',
      message: `Un nouvel examen médical a été créé pour le patient ${examen.patient.prenom} ${examen.patient.nom}`,
      type: 'EXAMEN_CREATED',
      lien: `/examens/${examen.examenID}`,
    });

    return examen;
  }

  async findAll() {
    return this.prisma.examenMedical.findMany({
      include: {
        patient: {
          select: {
            nom: true,
            prenom: true,
            dateNaissance: true,
          },
        },
        typeExamen: true,
        demandePar: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
      },
      orderBy: {
        dateExamen: 'desc',
      },
    });
  }

  async findOne(examenID: string) {
    const examen = await this.prisma.examenMedical.findUnique({
      where: { examenID },
      include: {
        patient: {
          select: {
            nom: true,
            prenom: true,
            dateNaissance: true,
          },
        },
        typeExamen: true,
        demandePar: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
        images: true,
      },
    });

    if (!examen) {
      throw new NotFoundException(`Examen médical avec l'ID ${examenID} non trouvé`);
    }

    return examen;
  }

  async update(examenID: string, updateExamenMedicalDto: UpdateExamenMedicalDto) {
    const examen = await this.findOne(examenID);

    const updatedExamen = await this.prisma.examenMedical.update({
      where: { examenID },
      data: updateExamenMedicalDto,
      include: {
        patient: {
          select: {
            nom: true,
            prenom: true,
            dateNaissance: true,
          },
        },
        typeExamen: true,
        demandePar: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
      },
    });

    // Notifier le demandeur
    await this.notificationsService.create({
      utilisateurID: examen.demandeParID,
      titre: 'Examen médical mis à jour',
      message: `L'examen médical du patient ${updatedExamen.patient.prenom} ${updatedExamen.patient.nom} a été mis à jour`,
      type: 'EXAMEN_UPDATED',
      lien: `/examens/${examenID}`,
    });

    return updatedExamen;
  }

  async remove(examenID: string) {
    const examen = await this.findOne(examenID);

    // Notifier le demandeur avant la suppression
    await this.notificationsService.create({
      utilisateurID: examen.demandeParID,
      titre: 'Examen médical supprimé',
      message: `L'examen médical du patient ${examen.patient.prenom} ${examen.patient.nom} a été supprimé`,
      type: 'EXAMEN_DELETED',
      lien: '/examens',
    });

    return this.prisma.examenMedical.delete({
      where: { examenID },
    });
  }

  async findByPatient(patientID: string) {
    return this.prisma.examenMedical.findMany({
      where: { patientID },
      include: {
        typeExamen: true,
        demandePar: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
        images: true,
      },
      orderBy: {
        dateExamen: 'desc',
      },
    });
  }

  async findByDossier(dossierID: string) {
    return this.prisma.examenMedical.findMany({
      where: { dossierID },
      include: {
        typeExamen: true,
        demandePar: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
        images: true,
      },
      orderBy: {
        dateExamen: 'desc',
      },
    });
  }
} 