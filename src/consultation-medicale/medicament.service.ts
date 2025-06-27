import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MedicamentDto } from './dto/medicament.dto';

@Injectable()
export class MedicamentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MedicamentDto[]> {
    const medicaments = await this.prisma.medicament.findMany({
      orderBy: { nom: 'asc' },
    });
    return medicaments.map(med => new MedicamentDto(med));
  }

  async findOne(medicamentID: string): Promise<MedicamentDto> {
    const medicament = await this.prisma.medicament.findUnique({
      where: { medicamentID },
    });
    if (!medicament) {
      throw new Error(`Medicament with ID ${medicamentID} not found`);
    }
    return new MedicamentDto(medicament);
  }

  async searchByName(searchTerm: string): Promise<MedicamentDto[]> {
    const medicaments = await this.prisma.medicament.findMany({
      where: {
        nom: {
          contains: searchTerm,
        },
      },
      orderBy: { nom: 'asc' },
      take: 50, // Limit results to 50
    });
    return medicaments.map(med => new MedicamentDto(med));
  }

  async searchByNameStartsWith(searchTerm: string): Promise<MedicamentDto[]> {
    const medicaments = await this.prisma.medicament.findMany({
      where: {
        nom: {
          startsWith: searchTerm,
        },
      },
      orderBy: { nom: 'asc' },
      take: 20, // Limit results to 20 for autocomplete
    });
    return medicaments.map(med => new MedicamentDto(med));
  }

  async getRandomMedicaments(limit: number = 10): Promise<MedicamentDto[]> {
    const medicaments = await this.prisma.medicament.findMany({
      take: limit,
      orderBy: {
        // Use a random order for variety
        medicamentID: 'asc',
      },
    });
    return medicaments.map(med => new MedicamentDto(med));
  }
} 