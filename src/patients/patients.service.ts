import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto, userId: string) {
    const { dossierMedical, ...patientData } = createPatientDto;

    return this.prisma.patient.create({
      data: {
        ...patientData,
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        dossierMedical: dossierMedical ? {
          create: {
            ...dossierMedical,
            createdBy: userId,
            createdAt: new Date(),
          }
        } : undefined
      },
      include: {
        dossierMedical: true,
      },
    });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      include: {
        dossierMedical: true,
        consultations: true,
        examens: true,
      },
    });
  }

  async findOne(patientID: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { patientID },
      include: {
        dossierMedical: true,
        consultations: true,
        examens: true,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient avec l'ID ${patientID} non trouvé`);
    }

    return patient;
  }

  async update(patientID: string, updatePatientDto: UpdatePatientDto) {
    const { dossierMedical, ...patientData } = updatePatientDto;

    return this.prisma.patient.update({
      where: { patientID },
      data: {
        ...patientData,
        updatedAt: new Date(),
      },
      include: {
        dossierMedical: true,
      },
    });
  }

  async remove(patientID: string) {
    await this.prisma.patient.delete({
      where: { patientID },
    });
  }

  async createMedicalRecord(patientID: string, createMedicalRecordDto: CreateMedicalRecordDto, userId: string) {
    const patient = await this.findOne(patientID);

    if (patient.dossierMedical) {
      throw new ConflictException('Un dossier médical existe déjà pour ce patient');
    }

    const dossierMedical = await this.prisma.dossierMedical.create({
      data: {
        patientID,
        etatDossier: createMedicalRecordDto.etatDossier,
        createdBy: userId,
        createdAt: new Date(),
      },
    });

    return dossierMedical;
  }

  async getMedicalRecord(patientID: string) {
    const patient = await this.findOne(patientID);
    return patient.dossierMedical;
  }

  async updateMedicalRecord(patientID: string, updateMedicalRecordDto: CreateMedicalRecordDto) {
    const patient = await this.findOne(patientID);

    if (!patient.dossierMedical) {
      throw new NotFoundException('Aucun dossier médical trouvé pour ce patient');
    }

    const dossierMedical = await this.prisma.dossierMedical.update({
      where: { patientID },
      data: {
        etatDossier: updateMedicalRecordDto.etatDossier,
      },
    });

    return dossierMedical;
  }
}
