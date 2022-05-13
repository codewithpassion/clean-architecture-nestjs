import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './infrastructure/openapi/openapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocument = createSwaggerDocument(app, AppModule, {
    title: 'Test app',
    description: 'NestJS Clean Architecture examples',
  });
  SwaggerModule.setup('/docs', app, swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none; } ',
  });

  await app.listen(3000);
}
bootstrap();
