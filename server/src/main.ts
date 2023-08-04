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
    .setVersion('1.0')
    .addTag('nestjs, api, links, developers, postgresql, prisma')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // use pipe validation globally
  // use whitelist to remove unwanted properties
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
