import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEtablissementDto, UpdateEtablissementDto, EtablissementDto } from './dto/etablissement.dto';
import { Etablissement, Prisma, TypeEtablissement } from '@prisma/client';

@Injectable()
export class EtablissementsService {
  constructor(private prisma: PrismaService) {}

  async create(createEtablissementDto: CreateEtablissementDto): Promise<EtablissementDto> {
    // Check if email already exists
    const existingEtablissement = await this.prisma.etablissement.findFirst({
      where: {
        OR: [
          { email: createEtablissementDto.email },
          { telephone: createEtablissementDto.telephone }
        ]
      }
    });

    if (existingEtablissement) {
      throw new ConflictException('Un établissement avec cet email ou numéro de téléphone existe déjà');
    }

    const data: Prisma.EtablissementCreateInput = {
      ...createEtablissementDto,
      type: createEtablissementDto.type as TypeEtablissement,
      estActif: createEtablissementDto.estActif ?? true,
    };

    const etablissement = await this.prisma.etablissement.create({
      data,
      include: {
        _count: {
          select: {
            utilisateurs: true
          }
        }
      }
    });

    return this.mapToDto(etablissement);
  }

  async findAll(): Promise<EtablissementDto[]> {
    const etablissements = await this.prisma.etablissement.findMany({
      orderBy: {
        nom: 'asc'
      },
      include: {
        _count: {
          select: {
            utilisateurs: true
          }
        }
      }
    });

    return etablissements.map(etablissement => this.mapToDto(etablissement));
  }

  async findOne(id: string): Promise<EtablissementDto> {
    const etablissement = await this.prisma.etablissement.findUnique({
      where: { etablissementID: id },
      include: {
        _count: {
          select: {
            utilisateurs: true
          }
        }
      }
    });

    if (!etablissement) {
      throw new NotFoundException(`Établissement avec l'ID ${id} non trouvé`);
    }

    return this.mapToDto(etablissement);
  }

  async update(id: string, updateEtablissementDto: UpdateEtablissementDto): Promise<EtablissementDto> {
    // Check if establishment exists
    const existingEtablissement = await this.prisma.etablissement.findUnique({
      where: { etablissementID: id },
    });

    if (!existingEtablissement) {
      throw new NotFoundException(`Établissement avec l'ID ${id} non trouvé`);
    }

    // If email or phone is being updated, check for duplicates
    if (updateEtablissementDto.email || updateEtablissementDto.telephone) {
      const duplicateCheck = await this.prisma.etablissement.findFirst({
        where: {
          AND: [
            { etablissementID: { not: id } },
            {
              OR: [
                { email: updateEtablissementDto.email },
                { telephone: updateEtablissementDto.telephone }
              ]
            }
          ]
        }
      });

      if (duplicateCheck) {
        throw new ConflictException('Un établissement avec cet email ou numéro de téléphone existe déjà');
      }
    }

    const data: Prisma.EtablissementUpdateInput = {
      ...updateEtablissementDto,
      type: updateEtablissementDto.type as TypeEtablissement | undefined,
    };

    const updatedEtablissement = await this.prisma.etablissement.update({
      where: { etablissementID: id },
      data,
      include: {
        _count: {
          select: {
            utilisateurs: true
          }
        }
      }
    });

    return this.mapToDto(updatedEtablissement);
  }

  async remove(id: string): Promise<void> {
    // Check if establishment exists
    const etablissement = await this.prisma.etablissement.findUnique({
      where: { etablissementID: id },
    });

    if (!etablissement) {
      throw new NotFoundException(`Établissement avec l'ID ${id} non trouvé`);
    }

    // Check if there are any users associated with this establishment
    const usersCount = await this.prisma.utilisateur.count({
      where: { etablissementID: id }
    });

    if (usersCount > 0) {
      throw new ConflictException('Impossible de supprimer cet établissement car il a des utilisateurs associés');
    }

    await this.prisma.etablissement.delete({
      where: { etablissementID: id },
    });
  }

  async findByRegion(region: string): Promise<EtablissementDto[]> {
    const etablissements = await this.prisma.etablissement.findMany({
      where: { region },
      orderBy: {
        nom: 'asc'
      },
      include: {
        _count: {
          select: {
            utilisateurs: true
          }
        }
      }
    });

    return etablissements.map(etablissement => this.mapToDto(etablissement));
  }

  async findByType(type: TypeEtablissement): Promise<EtablissementDto[]> {
    const etablissements = await this.prisma.etablissement.findMany({
      where: { type },
      orderBy: {
        nom: 'asc'
      },
      include: {
        _count: {
          select: {
            utilisateurs: true
          }
        }
      }
    });

    return etablissements.map(etablissement => this.mapToDto(etablissement));
  }

  private mapToDto(etablissement: Etablissement & { _count?: { utilisateurs: number } }): EtablissementDto {
    const { _count, ...etablissementData } = etablissement;
    return {
      ...etablissementData,
      type: etablissementData.type,
      estActif: etablissementData.estActif,
      createdAt: etablissementData.createdAt,
      updatedAt: etablissementData.updatedAt,
      description: etablissementData.description ?? undefined,
      siteWeb: etablissementData.siteWeb ?? undefined,
    };
  }
} 