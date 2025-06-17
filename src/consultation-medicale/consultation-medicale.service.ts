import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConsultationMedicaleDto } from './dto/create-consultation-medicale.dto';
import { UpdateConsultationMedicaleDto } from './dto/update-consultation-medicale.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ConsultationMedicaleService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(createConsultationMedicaleDto: CreateConsultationMedicaleDto, medecinID: string) {
    const { ordonnance, ...consultationData } = createConsultationMedicaleDto;
    const now = new Date();

    const consultation = await this.prisma.consultationMedicale.create({
      data: {
        ...consultationData,
        medecinID,
        createdAt: now,
        updatedAt: now,
        ordonnances: ordonnance ? {
          create: [{
            dateEmission: now,
            dateExpiration: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            estRenouvelable: false,
            prescriptions: {
              create: ordonnance.prescriptions.map(prescription => ({
                medicamentID: prescription.medicamentID,
                posologie: prescription.posologie,
                duree: prescription.duree,
                instructions: prescription.instructions,
              })),
            },
          }],
        } : undefined,
      },
      include: {
        patient: {
          select: {
            nom: true,
            prenom: true,
            dateNaissance: true,
          },
        },
        medecin: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
        ordonnances: {
          include: {
            prescriptions: {
              include: {
                medicament: true,
              },
            },
          },
        },
      },
    });

    // Notification au médecin
    await this.notificationsService.create({
      utilisateurID: medecinID,
      titre: 'Nouvelle Consultation Créée',
      message: `Une nouvelle consultation a été créée pour ${consultation.patient.nom} ${consultation.patient.prenom}`,
      type: 'CONSULTATION_CREATED',
      lien: `/consultations/${consultation.consultationID}`,
    });

    return consultation;
  }

  async findAll() {
    return this.prisma.consultationMedicale.findMany({
      include: {
        patient: {
          select: {
            nom: true,
            prenom: true,
            dateNaissance: true,
          },
        },
        medecin: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
        ordonnances: {
          include: {
            prescriptions: {
              include: {
                medicament: true,
              },
            },
          },
        },
      },
      orderBy: {
        dateConsultation: 'desc',
      },
    });
  }

  async findOne(consultationID: string) {
    const consultation = await this.prisma.consultationMedicale.findUnique({
      where: { consultationID },
      include: {
        patient: {
          select: {
            nom: true,
            prenom: true,
            dateNaissance: true,
          },
        },
        medecin: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
        ordonnances: {
          include: {
            prescriptions: {
              include: {
                medicament: true,
              },
            },
          },
        },
      },
    });

    if (!consultation) {
      throw new NotFoundException(`Consultation médicale avec l'ID ${consultationID} non trouvée`);
    }

    return consultation;
  }

  async update(consultationID: string, updateConsultationMedicaleDto: UpdateConsultationMedicaleDto) {
    const consultation = await this.findOne(consultationID);

    const updatedConsultation = await this.prisma.consultationMedicale.update({
      where: { consultationID },
      data: updateConsultationMedicaleDto,
      include: {
        patient: {
          select: {
            nom: true,
            prenom: true,
            dateNaissance: true,
          },
        },
        medecin: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
        ordonnances: {
          include: {
            prescriptions: {
              include: {
                medicament: true,
              },
            },
          },
        },
      },
    });

    // Notification au médecin
    await this.notificationsService.create({
      utilisateurID: consultation.medecinID,
      titre: 'Consultation Mise à Jour',
      message: `La consultation pour ${consultation.patient.nom} ${consultation.patient.prenom} a été mise à jour`,
      type: 'CONSULTATION_UPDATED',
      lien: `/consultations/${consultationID}`,
    });

    return updatedConsultation;
  }

  async remove(consultationID: string) {
    const consultation = await this.findOne(consultationID);

    // Notification au médecin avant la suppression
    await this.notificationsService.create({
      utilisateurID: consultation.medecinID,
      titre: 'Consultation Supprimée',
      message: `La consultation pour ${consultation.patient.nom} ${consultation.patient.prenom} a été supprimée`,
      type: 'CONSULTATION_DELETED',
      lien: '/consultations',
    });

    return this.prisma.consultationMedicale.delete({
      where: { consultationID },
    });
  }

  async findByPatient(patientID: string) {
    return this.prisma.consultationMedicale.findMany({
      where: { patientID },
      include: {
        medecin: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
        ordonnances: {
          include: {
            prescriptions: {
              include: {
                medicament: true,
              },
            },
          },
        },
      },
      orderBy: {
        dateConsultation: 'desc',
      },
    });
  }

  async findByDossier(dossierID: string) {
    return this.prisma.consultationMedicale.findMany({
      where: { dossierID },
      include: {
        medecin: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
        ordonnances: {
          include: {
            prescriptions: {
              include: {
                medicament: true,
              },
            },
          },
        },
      },
      orderBy: {
        dateConsultation: 'desc',
      },
    });
  }

  async findByMedecin(medecinID: string) {
    return this.prisma.consultationMedicale.findMany({
      where: { medecinID },
      include: {
        patient: {
          select: {
            nom: true,
            prenom: true,
            dateNaissance: true,
          },
        },
        ordonnances: {
          include: {
            prescriptions: {
              include: {
                medicament: true,
              },
            },
          },
        },
      },
      orderBy: {
        dateConsultation: 'desc',
      },
    });
  }
} 