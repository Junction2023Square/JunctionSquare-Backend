import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const options = new DocumentBuilder()
        .setTitle('NestJS Study API Docs')
        .setDescription('NestJS Study API description')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(3000);
}
bootstrap();
