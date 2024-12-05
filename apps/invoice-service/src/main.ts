import { NestFactory } from '@nestjs/core';
import { InvoiceServiceModule } from './invoice-service.module';

async function bootstrap() {
  const app = await NestFactory.create(InvoiceServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
