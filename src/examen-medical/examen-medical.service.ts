import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamenMedicalDto } from './dto/create-examen-medical.dto';
import { UpdateExamenMedicalDto } from './dto/update-examen-medical.dto';

@Injectable()
export class ExamenMedicalService {
  constructor(private prisma: PrismaService) {}

  async create(createExamenMedicalDto: CreateExamenMedicalDto, demandeParID: string) {
    return this.prisma.examenMedical.create({
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

    return this.prisma.examenMedical.update({
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
  }

  async remove(examenID: string) {
    await this.findOne(examenID);

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