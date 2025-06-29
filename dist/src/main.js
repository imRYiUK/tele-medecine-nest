"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: 'https://tele-medecine-next.vercel.app',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Authorization', 'Content-Type'],
        exposedHeaders: ['Content-Disposition'],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Sunu Santé')
        .setDescription('API pour la communication avec Orthanc DICOM Server')
        .setVersion('1.0')
        .addTag('DICOM', 'Endpoints pour la gestion des images DICOM')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(process.env.PORT ?? 5000);
    console.log(`Application démarrée sur le port ${process.env.PORT ?? 5000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map