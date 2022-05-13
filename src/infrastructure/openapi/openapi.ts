import { INestApplication, Type } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export type SwaggerOptions = {
  title: string;
  description: string;
};

export const createSwaggerDocument = (
  app: INestApplication,
  rootModule: Type<unknown>,
  { title, description }: SwaggerOptions,
) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearer',
    )
    .build();

  const operationIdFactory = (controllerKey: string, methodKey: string) =>
    `${methodKey}`;
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory,
    include: [rootModule],
    deepScanRoutes: true,
  });

  return document;
};
