import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrthancService {
  private readonly orthancUrl: string;
  private readonly orthancUsername: string;
  private readonly orthancPassword: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.orthancUrl = this.configService.get<string>('ORTHANC_URL') || 'http://localhost:8042';
    this.orthancUsername = this.configService.get<string>('ORTHANC_USERNAME') || 'orthanc';
    this.orthancPassword = this.configService.get<string>('ORTHANC_PASSWORD') || 'orthanc';
  }

  private getAuthHeaders() {
    return {
      Authorization: `Basic ${Buffer.from(`${this.orthancUsername}:${this.orthancPassword}`).toString('base64')}`,
    };
  }

  async getStudies(userId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.orthancUrl}/studies`, {
          headers: this.getAuthHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des études',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStudyDetails(studyId: string, userId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.orthancUrl}/studies/${studyId}`, {
          headers: this.getAuthHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des détails de l\'étude',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSeries(studyId: string, userId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.orthancUrl}/studies/${studyId}/series`, {
          headers: this.getAuthHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des séries',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSeriesDetails(seriesId: string, userId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.orthancUrl}/series/${seriesId}`, {
          headers: this.getAuthHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des détails de la série',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInstances(seriesId: string, userId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.orthancUrl}/series/${seriesId}/instances`, {
          headers: this.getAuthHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des instances',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInstanceDetails(instanceId: string, userId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.orthancUrl}/instances/${instanceId}`, {
          headers: this.getAuthHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des détails de l\'instance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getDicomFile(instanceId: string, userId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.orthancUrl}/instances/${instanceId}/file`, {
          headers: this.getAuthHeaders(),
          responseType: 'stream',
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération du fichier DICOM',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInstancePreview(instanceId: string, userId: string, quality: number = 90) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.orthancUrl}/instances/${instanceId}/preview`, {
          headers: this.getAuthHeaders(),
          params: { quality },
          responseType: 'arraybuffer',
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération de l\'aperçu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadDicomFile(fileBuffer: Buffer, userId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.orthancUrl}/instances`, fileBuffer, {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/dicom',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de l\'upload du fichier DICOM',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findDicom(level: string, query: any, userId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.orthancUrl}/tools/find`, {
          Level: level,
          Query: query,
        }, {
          headers: this.getAuthHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la recherche DICOM',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWadoImage(instanceId: string, contentType: string, userId: string): Promise<{ data: Buffer; headers: Record<string, string> }> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.orthancUrl}/instances/${instanceId}/wado`, {
          headers: this.getAuthHeaders(),
          params: { contentType },
          responseType: 'arraybuffer',
        }),
      );
      return {
        data: response.data,
        headers: response.headers as Record<string, string>,
      };
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération de l\'image WADO',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async saveImageMetadata(examenId: string, orthancId: string, studyUid: string, modalite: string) {
    try {
      const image = await this.prisma.imageMedicale.create({
        data: {
          examenID: examenId,
          studyInstanceUID: studyUid,
          seriesInstanceUID: orthancId,
          sopInstanceUID: orthancId,
          dateAcquisition: new Date(),
          modalite,
          description: `Image DICOM - ${modalite}`,
        },
      });
      return image;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la sauvegarde des métadonnées',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
