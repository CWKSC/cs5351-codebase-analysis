//https://docs.nestjs.com/openapi/introduction
//https://github.com/nestjs/nest/tree/master/sample/11-swagger
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Swagger example')
    .setDescription('API description: Test Swagger example')
    .setVersion('1.0')
    .addTag('All API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_swagger', app, document);

  await app.listen(4000);
}
bootstrap();
