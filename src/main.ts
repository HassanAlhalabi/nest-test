import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { SeederService } from './admin/seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cors
  const allowedOrigins = ['http://localhost:3333', 'http://localhost:3000'];
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  //Seeding
  const seeder = app.get(SeederService);
  await seeder.seedPermissions();
  await seeder.seedRoles();
  await seeder.seedAdmins();

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

  await app.listen(process.env.port);
}
bootstrap();
