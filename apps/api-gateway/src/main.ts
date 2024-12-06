import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}

bootstrap();
