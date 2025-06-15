import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { FindPatientsDto } from './dto/find-patients.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto, userId: string) {
    const { dossierMedical, ...patientData } = createPatientDto;
    
    // Créer le patient
    const patient = await this.prisma.patient.create({
      data: {
        ...patientData,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });

    // Si demandé, créer un dossier médical initial
    if (dossierMedical) {
      await this.prisma.dossierMedical.create({
        data: {
          patientID: patient.patientID,
          createdBy: userId,
          etatDossier: "en cours",
          createdAt: Date.now().toString()
        },
      });
    }

    return patient;
  }

  async findAll(params: FindPatientsDto) {
    const { search, page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    // Construire la requête de filtrage
    const where = search
      ? {
          OR: [
            { nom: { contains: search } },
            { prenom: { contains: search } },
          ],
        }
      : {};

    // Récupérer les patients avec pagination
    const [patients, total] = await Promise.all([
      this.prisma.patient.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          creator: {
            select: {
              utilisateurID: true,
              email: true,
            },
          },
          _count: {
            select: { consultations: true },
          },
        },
      }),
      this.prisma.patient.count({ where }),
    ]);

    return {
      data: patients,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(patientID: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { patientID },
      include: {
        creator: {
          select: {
            utilisateurID: true,
            email: true,
          },
        },
        consultations: {
          orderBy: { createdAt: 'desc' },
          include: {
            medecin: {
              select: {
                utilisateurID: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient avec l'ID ${patientID} non trouvé`);
    }

    return patient;
  }

  async update(patientID: string, updatePatientDto: UpdatePatientDto, userId: number) {
    // Vérifier si le patient existe
    await this.findOne(patientID);

    // Préparer les données à mettre à jour
    const data: any = { ...updatePatientDto };
    if (updatePatientDto.dateNaissance) {
      data.dateNaissance = new Date(updatePatientDto.dateNaissance);
    }

    // Mettre à jour le patient
    return this.prisma.patient.update({
      where: { patientID },
      data,
    });
  }

  async remove(patientID: string) {
    // Vérifier si le patient existe
    await this.findOne(patientID);

    // Supprimer le patient
    return this.prisma.patient.delete({
      where: { patientID },
    });
  }

  async createMedicalRecord(createMedicalRecordDto: CreateMedicalRecordDto, userId: string) {
    const { patientId, etatDossier } = createMedicalRecordDto;

    // Vérifier si le patient existe
    await this.findOne(patientId);

    // Créer le dossier médical
    return this.prisma.dossierMedical.create({
      data: {
        patientID: patientId,
        createdBy: userId,
        etatDossier,
        createdAt: Date.now().toString()
      },
    });
  }
}
