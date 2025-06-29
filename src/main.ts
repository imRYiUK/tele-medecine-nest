import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration de la validation globale
  app.useGlobalPipes(new ValidationPipe());
  
  // Configuration CORS
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['Content-Disposition'],
  });

  // Configuration Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle('API Sunu Santé')
    .setDescription('API pour la communication avec Orthanc DICOM Server')
    .setVersion('1.0')
    .addTag('DICOM', 'Endpoints pour la gestion des images DICOM')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 5000);
  console.log(`Application démarrée sur le port ${process.env.PORT ?? 5000}`);
}

bootstrap();
