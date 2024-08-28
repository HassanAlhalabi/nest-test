import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Starter Project')
    .setDescription('Starter API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Validation Pipe instantiate
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Global Filters
  app.useGlobalFilters(new HttpExceptionFilter());

    // Apply the global interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3333);
}
bootstrap();
