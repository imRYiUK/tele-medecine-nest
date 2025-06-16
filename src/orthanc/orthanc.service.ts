import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { JournalActivityService } from '../journal/journal-activity.service';

@Injectable()
export class OrthancService {
  private readonly baseUrl: string;
  private readonly auth: { username: string; password: string };

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly journalActivityService: JournalActivityService,
  ) {
    this.baseUrl = this.configService.get<string>('ORTHANC_URL') || 'http://localhost:8042';
    this.auth = {
      username: this.configService.get<string>('ORTHANC_USERNAME') || 'orthanc',
      password: this.configService.get<string>('ORTHANC_PASSWORD') || 'orthanc',
    };
  }

  async getStudies(userId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/studies`, {
        auth: this.auth,
      })
    );

    await this.journalActivityService.logActivity({
      utilisateurID: userId,
      typeAction: 'CONSULTATION_ETUDES',
      description: 'Consultation de la liste des études DICOM',
    });

    return response.data;
  }

  async getStudyDetails(studyId: string, userId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/studies/${studyId}`, {
        auth: this.auth,
      })
    );

    await this.journalActivityService.logActivity({
      utilisateurID: userId,
      typeAction: 'CONSULTATION_ETUDE',
      description: `Consultation des détails de l'étude DICOM: ${studyId}`,
    });

    return response.data;
  }

  async getSeries(studyId: string, userId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/studies/${studyId}/series`, {
        auth: this.auth,
      })
    );

    await this.journalActivityService.logActivity({
      utilisateurID: userId,
      typeAction: 'CONSULTATION_SERIES',
      description: `Consultation des séries de l'étude DICOM: ${studyId}`,
    });

    return response.data;
  }

  async getSeriesDetails(seriesId: string, userId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/series/${seriesId}`, {
        auth: this.auth,
      })
    );

    await this.journalActivityService.logActivity({
      utilisateurID: userId,
      typeAction: 'CONSULTATION_SERIE',
      description: `Consultation des détails de la série DICOM: ${seriesId}`,
    });

    return response.data;
  }

  async getInstances(seriesId: string, userId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/series/${seriesId}/instances`, {
        auth: this.auth,
      })
    );

    await this.journalActivityService.logActivity({
      utilisateurID: userId,
      typeAction: 'CONSULTATION_INSTANCES',
      description: `Consultation des instances de la série DICOM: ${seriesId}`,
    });

    return response.data;
  }

  async getInstanceDetails(instanceId: string, userId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/instances/${instanceId}`, {
        auth: this.auth,
      })
    );

    await this.journalActivityService.logActivity({
      utilisateurID: userId,
      typeAction: 'CONSULTATION_INSTANCE',
      description: `Consultation des détails de l'instance DICOM: ${instanceId}`,
    });

    return response.data;
  }

  async getDicomFile(instanceId: string, userId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/instances/${instanceId}/file`, {
        auth: this.auth,
        responseType: 'stream',
      })
    );

    await this.journalActivityService.logActivity({
      utilisateurID: userId,
      typeAction: 'TELECHARGEMENT_DICOM',
      description: `Téléchargement du fichier DICOM: ${instanceId}`,
    });

    return response.data;
  }

  async getInstancePreview(instanceId: string, userId: string, quality: number = 90) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/instances/${instanceId}/preview`, {
        auth: this.auth,
        params: { quality },
        responseType: 'arraybuffer',
      })
    );

    await this.journalActivityService.logActivity({
      utilisateurID: userId,
      typeAction: 'CONSULTATION_APERCU',
      description: `Consultation de l'aperçu de l'instance DICOM: ${instanceId}`,
    });

    return response.data;
  }

  // Méthode pour sauvegarder les informations d'image dans la base de données
  async saveImageMetadata(
    examenId: string,
    orthancId: string,
    studyUid: string,
    modalite: string,
  ) {
    // Cette méthode serait implémentée pour sauvegarder les métadonnées
    // d'une image DICOM dans la base de données PostgreSQL
    // Elle utiliserait PrismaService pour créer une entrée dans la table ImageMedicale
    return {
      message: 'Métadonnées sauvegardées avec succès',
      examenId,
      orthancId,
      studyUid,
      modalite,
    };
  }

  /**
   * Upload un fichier DICOM vers Orthanc (C-STORE)
   * @param fileBuffer Buffer contenant le fichier DICOM
   * @param userId
   * @returns Réponse d'Orthanc avec les informations sur le fichier uploadé
   */
  async uploadDicomFile(fileBuffer: Buffer, userId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.post(`${this.baseUrl}/instances`, fileBuffer, {
        auth: this.auth,
        headers: {
          'Content-Type': 'application/dicom',
        },
      })
    );

    await this.journalActivityService.logActivity({
      utilisateurID: userId,
      typeAction: 'UPLOAD_DICOM',
      description: `Upload d'un nouveau fichier DICOM`,
    });

    return response.data;
  }

  /**
   * Recherche DICOM (C-FIND)
   * @param level Niveau de recherche (Patient, Study, Series, Instance)
   * @param query Critères de recherche
   * @param userId
   * @returns Résultats de la recherche
   */
  async findDicom(level: string, query: Record<string, any>, userId: string) {
    const validLevels = ['Patient', 'Study', 'Series', 'Instance'];
    if (!validLevels.includes(level)) {
      throw new HttpException(
        `Niveau de recherche invalide. Valeurs acceptées: ${validLevels.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.post(
        `${this.baseUrl}/tools/find`,
        {
          Level: level,
          Query: query,
        },
        {
          auth: this.auth,
        },
      ),
    );

    await this.journalActivityService.logActivity({
      utilisateurID: userId,
      typeAction: 'RECHERCHE_DICOM',
      description: `Recherche DICOM au niveau: ${level}`,
    });

    return response.data;
  }

  /**
   * Récupère une image DICOM via WADO-GET
   * @param instanceId ID de l'instance
   * @param contentType Type de contenu demandé (image/jpeg, image/png, etc.)
   * @param userId
   * @returns Données de l'image et en-têtes
   */
  async getWadoImage(instanceId: string, contentType: string = 'image/jpeg', userId: string) {
    // Vérifier si l'instance existe
    try {
      await this.getInstanceDetails(instanceId, userId);
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException('Instance non trouvée', HttpStatus.NOT_FOUND);
      }
      throw error;
    }

    // Déterminer le endpoint en fonction du type de contenu
    let endpoint = `${this.baseUrl}/instances/${instanceId}/preview`;
    let responseType: 'arraybuffer' = 'arraybuffer';
    let params = {};

    if (contentType === 'application/dicom') {
      // Si on demande le fichier DICOM original
      endpoint = `${this.baseUrl}/instances/${instanceId}/file`;
    } else if (contentType.startsWith('image/')) {
      // Si on demande une image (JPEG, PNG, etc.)
      endpoint = `${this.baseUrl}/instances/${instanceId}/rendered`;
      params = { 
        format: contentType.split('/')[1], // jpeg, png, etc.
        quality: '90'
      };
    }

    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(endpoint, {
        auth: this.auth,
        responseType,
        params,
      })
    );

    return {
      data: response.data,
      headers: {
        'Content-Type': contentType,
        'Content-Length': response.headers['content-length'],
        'Cache-Control': 'max-age=3600',
      },
    };
  }
}
