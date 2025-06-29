import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CreateExamenMedicalDto, 
  UpdateExamenMedicalDto,
  ExamenMedicalResponseDto,
  ExamenMedicalListDto,
  CreateImageMedicaleDto,
  UpdateImageMedicaleDto,
  ImageMedicaleDto
} from './dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ExamenMedicalService {
  private readonly logger = new Logger(ExamenMedicalService.name);

  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(createExamenMedicalDto: CreateExamenMedicalDto, demandeParID: string) {
    // Ensure dossierID is provided since it's required in the database
    if (!createExamenMedicalDto.dossierID) {
      throw new Error('dossierID est requis pour créer un examen médical');
    }

    const examen = await this.prisma.examenMedical.create({
      data: {
        ...createExamenMedicalDto,
        dateExamen: new Date(createExamenMedicalDto.dateExamen),
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
      destinataires: [demandeParID],
      titre: 'Nouvel examen médical créé',
      message: `Un nouvel examen médical a été créé pour le patient ${examen.patient.prenom} ${examen.patient.nom}`,
      type: 'EXAMEN_CREATED',
      lien: `/examens/${examen.examenID}`,
    }, demandeParID);

    return examen;
  }

  async findAll(status?: string, category?: string, search?: string) {
    const where: any = {};

    // Filtre par statut
    if (status && status !== 'TOUS') {
      if (status === 'EN_ATTENTE') {
        where.estAnalyse = false;
      } else if (status === 'EN_COURS') {
        where.estAnalyse = false;
        where.radiologues = {
          some: {}
        };
      } else if (status === 'TERMINE') {
        where.estAnalyse = true;
      } else if (status === 'URGENT') {
        where.description = {
          contains: 'urgent'
        };
      }
    }

    // Filtre par catégorie
    if (category && category !== 'TOUS') {
      where.typeExamen = {
        categorie: category
      };
    }

    // Filtre par recherche
    if (search) {
      where.OR = [
        {
          patient: {
            OR: [
              { nom: { contains: search } },
              { prenom: { contains: search } }
            ]
          }
        },
        {
          typeExamen: {
            nomType: { contains: search }
          }
        },
        {
          demandePar: {
            OR: [
              { nom: { contains: search } },
              { prenom: { contains: search } }
            ]
          }
        },
        {
          description: { contains: search }
        }
      ];
    }

    return this.prisma.examenMedical.findMany({
      where,
      include: {
        patient: true,
        typeExamen: true,
        demandePar: true,
        images: true,
        radiologues: true,
      },
      orderBy: {
        dateExamen: 'desc',
      },
    });
  }

  async findOne(examenID: string, radiologistID?: string) {
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
        radiologues: {
          select: { utilisateurID: true, nom: true, prenom: true, email: true }
        }
      },
    });

    if (!examen) {
      throw new NotFoundException(`Examen médical avec l'ID ${examenID} non trouvé`);
    }

    // Si un radiologistID est fourni, vérifier les permissions de consultation
    if (radiologistID) {
      await this.checkRadiologistViewPermissions(examenID, radiologistID);
    }

    return examen;
  }

  async update(examenID: string, updateExamenMedicalDto: UpdateExamenMedicalDto, radiologistID?: string) {
    const examen = await this.findOne(examenID, radiologistID);

    // Si un radiologistID est fourni, vérifier les permissions
    if (radiologistID) {
      await this.checkRadiologistPermissions(examenID, radiologistID);
    }

    // Convert dateExamen string to Date if provided
    const updateData: any = { ...updateExamenMedicalDto };
    if (updateData.dateExamen) {
      updateData.dateExamen = new Date(updateData.dateExamen);
    }

    const updatedExamen = await this.prisma.examenMedical.update({
      where: { examenID },
      data: updateData,
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
      destinataires: [examen.demandeParID],
      titre: 'Examen médical mis à jour',
      message: `L'examen médical du patient ${updatedExamen.patient.prenom} ${updatedExamen.patient.nom} a été mis à jour`,
      type: 'EXAMEN_UPDATED',
      lien: `/examens/${examenID}`,
    }, examen.demandeParID);

    return updatedExamen;
  }

  async remove(examenID: string) {
    const examen = await this.findOne(examenID, undefined);

    // Notifier le demandeur avant la suppression
    await this.notificationsService.create({
      destinataires: [examen.demandeParID],
      titre: 'Examen médical supprimé',
      message: `L'examen médical du patient ${examen.patient.prenom} ${examen.patient.nom} a été supprimé`,
      type: 'EXAMEN_DELETED',
      lien: '/examens',
    }, examen.demandeParID);

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
        radiologues: {
          select: { utilisateurID: true, nom: true, prenom: true, email: true }
        }
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
        radiologues: {
          select: { utilisateurID: true, nom: true, prenom: true, email: true }
        }
      },
      orderBy: {
        dateExamen: 'desc',
      },
    });
  }

  async inviteRadiologue(examenID: string, radiologueID: string) {
    // Vérifier que l'examen existe
    await this.findOne(examenID, undefined);
    // Associer le radiologue à l'examen
    return this.prisma.examenMedical.update({
      where: { examenID },
      data: {
        radiologues: {
          connect: { utilisateurID: radiologueID }
        }
      },
      include: {
        radiologues: {
          select: { utilisateurID: true, nom: true, prenom: true, email: true }
        }
      }
    });
  }

  async getRadiologistStats(radiologueID: string) {
    // Récupérer l'établissement du radiologue connecté
    const radiologue = await this.prisma.utilisateur.findUnique({
      where: { utilisateurID: radiologueID },
      select: { etablissementID: true }
    });

    if (!radiologue || !radiologue.etablissementID) {
      throw new ForbiddenException('Radiologue non trouvé ou non assigné à un établissement');
    }

    const [
      examensEnAttente,
      examensEnCours,
      examensTermines,
      examensUrgents
    ] = await Promise.all([
      this.prisma.examenMedical.count({
        where: {
          estAnalyse: false,
          demandePar: { etablissementID: radiologue.etablissementID }
        }
      }),
      this.prisma.examenMedical.count({
        where: {
          estAnalyse: false,
          demandePar: { etablissementID: radiologue.etablissementID }
        }
      }),
      this.prisma.examenMedical.count({
        where: {
          estAnalyse: true,
          demandePar: { etablissementID: radiologue.etablissementID }
        }
      }),
      this.prisma.examenMedical.count({
        where: {
          demandePar: { etablissementID: radiologue.etablissementID },
          OR: [
            { description: { contains: 'urgent' } },
            { description: { contains: 'critique' } }
          ]
        }
      })
    ]);

    return {
      examensEnAttente,
      examensEnCours,
      examensTermines,
      examensUrgents
    };
  }

  async getRecentExams(radiologueID: string) {
    // Récupérer l'établissement du radiologue connecté
    const radiologue = await this.prisma.utilisateur.findUnique({
      where: { utilisateurID: radiologueID },
      select: { etablissementID: true }
    });

    if (!radiologue || !radiologue.etablissementID) {
      throw new ForbiddenException('Radiologue non trouvé ou non assigné à un établissement');
    }

    return this.prisma.examenMedical.findMany({
      where: {
        demandePar: { etablissementID: radiologue.etablissementID }
      },
      include: {
        patient: true,
        typeExamen: true,
        demandePar: true,
        images: true,
        radiologues: true,
      },
      orderBy: {
        dateExamen: 'desc',
      },
      take: 10,
    });
  }

  async markAsAnalyzed(examenID: string, resultat: string, radiologistID: string) {
    // Vérifier les permissions du radiologue
    await this.checkRadiologistPermissions(examenID, radiologistID);

    return this.prisma.examenMedical.update({
      where: { examenID },
      data: {
        estAnalyse: true,
        resultat,
      },
      include: {
        patient: true,
        typeExamen: true,
        demandePar: true,
        images: true,
        radiologues: true,
      },
    });
  }

  async getTypeExamens() {
    return this.prisma.typeExamen.findMany({
      orderBy: {
        nomType: 'asc',
      },
    });
  }

  // Image Management Methods
  async createImage(createImageDto: CreateImageMedicaleDto, radiologistID?: string): Promise<ImageMedicaleDto> {
    // Verify that the exam exists
    const exam = await this.prisma.examenMedical.findUnique({
      where: { examenID: createImageDto.examenID },
    });

    if (!exam) {
      throw new NotFoundException(`Examen médical avec l'ID ${createImageDto.examenID} non trouvé`);
    }

    // Si un radiologistID est fourni, vérifier les permissions
    if (radiologistID) {
      await this.checkRadiologistPermissions(createImageDto.examenID, radiologistID);
    }

    // Auto-generate a default WADO/preview URL if not provided
    let url = createImageDto.url;
    if (!url && createImageDto.sopInstanceUID) {
      // Example: /dicom/wado/:sopInstanceUID (adjust to your actual route)
      url = `/dicom/wado/${encodeURIComponent(createImageDto.sopInstanceUID)}`;
    }

    // Generate preview URL if orthancInstanceId is provided
    let previewUrl: string | null = null;
    if (createImageDto.orthancInstanceId) {
      previewUrl = `/dicom/instances/${createImageDto.orthancInstanceId}/preview`;
    }

    // Convert dateAcquisition string to Date object
    const dateAcquisition = new Date(createImageDto.dateAcquisition);

    const image = await this.prisma.imageMedicale.create({
      data: {
        examenID: createImageDto.examenID,
        studyInstanceUID: createImageDto.studyInstanceUID,
        seriesInstanceUID: createImageDto.seriesInstanceUID,
        sopInstanceUID: createImageDto.sopInstanceUID,
        dateAcquisition: dateAcquisition,
        modalite: createImageDto.modalite,
        description: createImageDto.description,
        url: url || null,
        orthancInstanceId: createImageDto.orthancInstanceId || null,
      } as any,
    });

    // Notify the exam requester about the new image
    await this.notificationsService.create({
      destinataires: [exam.demandeParID],
      titre: 'Nouvelle image ajoutée',
      message: `Une nouvelle image a été ajoutée à l'examen médical du patient`,
      type: 'IMAGE_ADDED',
      lien: `/examens/${exam.examenID}`,
    }, exam.demandeParID);

    return image;
  }

  async getImagesByExam(examenID: string, radiologistID?: string): Promise<ImageMedicaleDto[]> {
    // Verify that the exam exists and check permissions if radiologistID is provided
    if (radiologistID) {
      await this.findOne(examenID, radiologistID);
    } else {
      const exam = await this.prisma.examenMedical.findUnique({
        where: { examenID },
      });

      if (!exam) {
        throw new NotFoundException(`Examen médical avec l'ID ${examenID} non trouvé`);
      }
    }

    return this.prisma.imageMedicale.findMany({
      where: { examenID },
      orderBy: { dateAcquisition: 'desc' },
    });
  }

  async updateImage(imageID: string, updateImageDto: UpdateImageMedicaleDto, radiologistID?: string): Promise<ImageMedicaleDto> {
    const image = await this.prisma.imageMedicale.findUnique({
      where: { imageID },
      include: {
        examen: {
          include: {
            patient: true,
          },
        },
      },
    });

    if (!image) {
      throw new NotFoundException(`Image médicale avec l'ID ${imageID} non trouvée`);
    }

    // Si un radiologistID est fourni, vérifier les permissions
    if (radiologistID) {
      await this.checkRadiologistPermissions(image.examenID, radiologistID);
    }

    const updatedImage = await this.prisma.imageMedicale.update({
      where: { imageID },
      data: updateImageDto,
    });

    // Notify about image update
    await this.notificationsService.create({
      destinataires: [image.examen.demandeParID],
      titre: 'Image médicale mise à jour',
      message: `Une image de l'examen du patient ${image.examen.patient.prenom} ${image.examen.patient.nom} a été mise à jour`,
      type: 'IMAGE_UPDATED',
      lien: `/examens/${image.examenID}`,
    }, image.examen.demandeParID);

    return updatedImage;
  }

  async deleteImage(imageID: string, radiologistID?: string): Promise<void> {
    const image = await this.prisma.imageMedicale.findUnique({
      where: { imageID },
      include: {
        examen: {
          include: {
            patient: true,
          },
        },
      },
    });

    if (!image) {
      throw new NotFoundException(`Image médicale avec l'ID ${imageID} non trouvée`);
    }

    // Si un radiologistID est fourni, vérifier les permissions
    if (radiologistID) {
      await this.checkRadiologistPermissions(image.examenID, radiologistID);
    }

    await this.prisma.imageMedicale.delete({
      where: { imageID },
    });

    // Notify about image deletion
    await this.notificationsService.create({
      destinataires: [image.examen.demandeParID],
      titre: 'Image médicale supprimée',
      message: `Une image de l'examen du patient ${image.examen.patient.prenom} ${image.examen.patient.nom} a été supprimée`,
      type: 'IMAGE_DELETED',
      lien: `/examens/${image.examenID}`,
    }, image.examen.demandeParID);
  }

  async getImageCountByExam(examenID: string): Promise<number> {
    return this.prisma.imageMedicale.count({
      where: { examenID },
    });
  }

  async findImageBySopInstanceUID(sopInstanceUID: string): Promise<ImageMedicaleDto> {
    this.logger.log(`Searching for image with SOP Instance UID: ${sopInstanceUID}`);
    
    const image = await this.prisma.imageMedicale.findFirst({
      where: { sopInstanceUID },
    });

    this.logger.log(`Database query result: ${image ? 'Image found' : 'Image not found'}`);
    
    if (image) {
      this.logger.log(`Found image - imageID: ${image.imageID}, sopInstanceUID: ${image.sopInstanceUID}`);
    } else {
      this.logger.warn(`No image found with SOP Instance UID: ${sopInstanceUID}`);
    }

    if (!image) {
      throw new NotFoundException(`Image with SOP Instance UID ${sopInstanceUID} not found`);
    }

    return image;
  }

  async getExamsWithImageCounts(etablissementID?: string): Promise<ExamenMedicalListDto[]> {
    const where: any = {};
    if (etablissementID) {
      where.demandePar = { etablissementID };
    }
    
    const exams = await this.prisma.examenMedical.findMany({
      where,
      include: {
        patient: {
          select: {
            nom: true,
            prenom: true,
          },
        },
        typeExamen: {
          select: {
            nomType: true,
            categorie: true,
          },
        },
        demandePar: {
          select: {
            nom: true,
            prenom: true,
            etablissementID: true,
          },
        },
        _count: {
          select: {
            images: true,
            radiologues: true,
          },
        },
      },
      orderBy: {
        dateExamen: 'desc',
      },
    });

    return exams.map(exam => ({
      examenID: exam.examenID,
      dateExamen: exam.dateExamen,
      description: exam.description,
      estAnalyse: exam.estAnalyse,
      patientNom: exam.patient.nom,
      patientPrenom: exam.patient.prenom,
      typeExamenNom: exam.typeExamen.nomType,
      typeExamenCategorie: exam.typeExamen.categorie,
      demandeParNom: exam.demandePar.nom,
      demandeParPrenom: exam.demandePar.prenom,
      nombreImages: exam._count.images,
      nombreRadiologues: exam._count.radiologues,
    }));
  }

  async getRadiologistExamsWithImageCounts(radiologueID: string): Promise<ExamenMedicalListDto[]> {
    // Récupérer l'établissement du radiologue connecté
    const radiologue = await this.prisma.utilisateur.findUnique({
      where: { utilisateurID: radiologueID },
      select: { etablissementID: true }
    });

    if (!radiologue || !radiologue.etablissementID) {
      throw new ForbiddenException('Radiologue non trouvé ou non assigné à un établissement');
    }

    const where: any = {
      demandePar: { etablissementID: radiologue.etablissementID }
    };
    
    const exams = await this.prisma.examenMedical.findMany({
      where,
      include: {
        patient: {
          select: {
            nom: true,
            prenom: true,
          },
        },
        typeExamen: {
          select: {
            nomType: true,
            categorie: true,
          },
        },
        demandePar: {
          select: {
            nom: true,
            prenom: true,
            etablissementID: true,
          },
        },
        _count: {
          select: {
            images: true,
            radiologues: true,
          },
        },
      },
      orderBy: {
        dateExamen: 'desc',
      },
    });

    return exams.map(exam => ({
      examenID: exam.examenID,
      dateExamen: exam.dateExamen,
      description: exam.description,
      estAnalyse: exam.estAnalyse,
      patientNom: exam.patient.nom,
      patientPrenom: exam.patient.prenom,
      typeExamenNom: exam.typeExamen.nomType,
      typeExamenCategorie: exam.typeExamen.categorie,
      demandeParNom: exam.demandePar.nom,
      demandeParPrenom: exam.demandePar.prenom,
      nombreImages: exam._count.images,
      nombreRadiologues: exam._count.radiologues,
    }));
  }

  /**
   * Vérifie si un radiologue a la permission de voir un examen
   * Un radiologue peut voir un examen si :
   * 1. Il a été explicitement assigné à cet examen (dans la relation radiologues)
   * 2. Il est un collaborateur accepté sur au moins une image de cet examen
   */
  async canRadiologistViewExam(examenID: string, radiologistID: string): Promise<boolean> {
    const exam = await this.prisma.examenMedical.findUnique({
      where: { examenID },
      select: {
        radiologues: {
          select: {
            utilisateurID: true,
          },
        },
        images: {
          select: {
            imageID: true,
            collaborations: {
              where: {
                status: 'ACCEPTED',
                OR: [
                  { inviterID: radiologistID },
                  { inviteeID: radiologistID }
                ]
              },
              select: {
                id: true
              }
            }
          }
        }
      },
    });

    if (!exam) {
      return false;
    }

    // Vérifier si le radiologue a été assigné à cet examen
    const isAssigned = exam.radiologues.some(rad => rad.utilisateurID === radiologistID);
    if (isAssigned) {
      return true;
    }

    // Vérifier si le radiologue est un collaborateur sur au moins une image de cet examen
    const hasImageCollaboration = exam.images.some(image => image.collaborations.length > 0);
    return hasImageCollaboration;
  }

  /**
   * Vérifie les permissions avant d'autoriser la consultation d'un examen
   * Lance une exception si le radiologue n'a pas les permissions
   */
  async checkRadiologistViewPermissions(examenID: string, radiologistID: string): Promise<void> {
    const canView = await this.canRadiologistViewExam(examenID, radiologistID);
    
    if (!canView) {
      throw new ForbiddenException(
        'Vous n\'avez pas la permission de consulter cet examen. ' +
        'Vous devez être invité à collaborer sur cet examen.'
      );
    }
  }

  /**
   * Vérifie si un radiologue a la permission d'éditer un examen
   * Un radiologue peut éditer un examen si :
   * 1. Il a été explicitement assigné à cet examen (dans la relation radiologues)
   * 2. Il est un collaborateur accepté sur au moins une image de cet examen
   */
  async canRadiologistEditExam(examenID: string, radiologistID: string): Promise<boolean> {
    const exam = await this.prisma.examenMedical.findUnique({
      where: { examenID },
      select: {
        radiologues: {
          select: {
            utilisateurID: true,
          },
        },
        images: {
          select: {
            imageID: true,
            collaborations: {
              where: {
                status: 'ACCEPTED',
                OR: [
                  { inviterID: radiologistID },
                  { inviteeID: radiologistID }
                ]
              },
              select: {
                id: true
              }
            }
          }
        }
      },
    });

    if (!exam) {
      return false;
    }

    // Vérifier si le radiologue a été assigné à cet examen
    const isAssigned = exam.radiologues.some(rad => rad.utilisateurID === radiologistID);
    if (isAssigned) {
      return true;
    }

    // Vérifier si le radiologue est un collaborateur sur au moins une image de cet examen
    const hasImageCollaboration = exam.images.some(image => image.collaborations.length > 0);
    return hasImageCollaboration;
  }

  /**
   * Vérifie les permissions avant d'autoriser l'édition d'un examen
   * Lance une exception si le radiologue n'a pas les permissions
   */
  async checkRadiologistPermissions(examenID: string, radiologistID: string): Promise<void> {
    const canEdit = await this.canRadiologistEditExam(examenID, radiologistID);
    
    if (!canEdit) {
      throw new ForbiddenException(
        'Vous n\'avez pas la permission d\'éditer cet examen. ' +
        'Vous devez être invité à collaborer sur cet examen.'
      );
    }
  }
} 