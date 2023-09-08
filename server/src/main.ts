import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger docs
  const config = new DocumentBuilder()
    .setTitle('My Links API')
    .setDescription(
      'An API for developers to consolidate and share their links.',
    )
    .addBearerAuth(undefined, 'access-token')
    .setVersion('1.0')
    .addTag('nestjs, api, links, developers, postgresql, prisma')
    .build();

  const options = {
    swaggerOptions: {
      authAction: {
        'access-token': {
          name: 'access-token',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: 'thisIsASampleBearerAuthToken123',
        },
      },
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);

  // use pipe validation globally
  // use whitelist to remove unwanted properties
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // get cors enabled
  app.enableCors();

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
