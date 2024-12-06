import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrderManagementModule } from './order-management.module';
import { configDotenv } from 'dotenv';
configDotenv();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderManagementModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: process.env.RABBITMQ_ORDER_QUEUE || 'order-queue',
      },
    },
  );
  app.listen();
}

bootstrap();