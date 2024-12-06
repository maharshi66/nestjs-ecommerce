import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}

bootstrap();
