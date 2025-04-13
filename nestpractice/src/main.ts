import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './_common/exceptions/http.exception.filter';
import { ProjectOptions } from './../node_modules/@types/istanbul-reports/index.d';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const logger = new Logger();
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalInterceptors();
  app.get(ConfigService);

  const PORT: number = parseInt(process.env.PORT || '9898', 10);
  const HOST: string = process.env.HOST || '127.0.0.1';
  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access_token',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'refresh_token',
    )
    .setTitle('SEAH ADMIN BLOG')
    .setDescription('THE SEAH ADMIN BLOGß API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const hypertextTransferProtocol: string =
    process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const appListUrl: string = `${hypertextTransferProtocol}://${HOST}:${PORT}/docs`;
  await app.listen(PORT, () => console.log(appListUrl));
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
