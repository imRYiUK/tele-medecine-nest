import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

@Injectable()
export class OrthancService {
  private readonly baseUrl: string;
  private readonly auth: { username: string; password: string };

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('ORTHANC_URL') || 'http://localhost:8042';
    this.auth = {
      username: this.configService.get<string>('ORTHANC_USERNAME') || 'orthanc',
      password: this.configService.get<string>('ORTHANC_PASSWORD') || 'orthanc',
    };
  }

  async getStudies() {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/studies`, {
        auth: this.auth,
      })
    );
    return response.data;
  }

  async getStudyDetails(studyId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/studies/${studyId}`, {
        auth: this.auth,
      })
    );
    return response.data;
  }

  async getSeries(studyId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/studies/${studyId}/series`, {
        auth: this.auth,
      })
    );
    return response.data;
  }

  async getSeriesDetails(seriesId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/series/${seriesId}`, {
        auth: this.auth,
      })
    );
    return response.data;
  }

  async getInstances(seriesId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/series/${seriesId}/instances`, {
        auth: this.auth,
      })
    );
    return response.data;
  }

  async getInstanceDetails(instanceId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/instances/${instanceId}`, {
        auth: this.auth,
      })
    );
    return response.data;
  }

  async getDicomFile(instanceId: string) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/instances/${instanceId}/file`, {
        auth: this.auth,
        responseType: 'stream',
      })
    );
    return response.data; // stream
  }

  async getInstancePreview(instanceId: string, quality: number = 90) {
    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.get(`${this.baseUrl}/instances/${instanceId}/preview`, {
        auth: this.auth,
        params: { quality },
        responseType: 'arraybuffer',
      })
    );
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
   * @returns Réponse d'Orthanc avec les informations sur le fichier uploadé
   */
  async uploadDicomFile(fileBuffer: Buffer) {
    try {
      const response = await firstValueFrom<AxiosResponse>(
        this.httpService.post(`${this.baseUrl}/instances`, fileBuffer, {
          auth: this.auth,
          headers: {
            'Content-Type': 'application/dicom',
          },
        })
      );
      return response.data;
    } catch (error) {
      // Vérifier si c'est une erreur de validation DICOM
      if (error.response?.status === 400) {
        throw new HttpException(
          {
            message: 'Fichier DICOM invalide',
            details: error.response.data,
          },
          HttpStatus.BAD_REQUEST
        );
      }
      throw error;
    }
  }

  /**
   * Recherche DICOM (C-FIND)
   * @param level Niveau de recherche (Patient, Study, Series, Instance)
   * @param query Critères de recherche
   * @returns Résultats de la recherche
   */
  async findDicom(level: string, query: Record<string, any>) {
    const validLevels = ['Patient', 'Study', 'Series', 'Instance'];
    if (!validLevels.includes(level)) {
      throw new HttpException(
        `Niveau de recherche invalide. Valeurs acceptées: ${validLevels.join(', ')}`,
        HttpStatus.BAD_REQUEST
      );
    }

    const response = await firstValueFrom<AxiosResponse>(
      this.httpService.post(`${this.baseUrl}/tools/find`, {
        Level: level,
        Query: query,
      }, {
        auth: this.auth,
      })
    );
    return response.data;
  }

  /**
   * Récupère une image DICOM via WADO-GET
   * @param instanceId ID de l'instance
   * @param contentType Type de contenu demandé (image/jpeg, image/png, etc.)
   * @returns Données de l'image et en-têtes
   */
  async getWadoImage(instanceId: string, contentType: string = 'image/jpeg') {
    // Vérifier si l'instance existe
    try {
      await this.getInstanceDetails(instanceId);
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
