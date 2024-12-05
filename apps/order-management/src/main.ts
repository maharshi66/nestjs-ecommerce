import { NestFactory } from '@nestjs/core';
import { OrderManagementModule } from './order-management.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderManagementModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
