import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { InventoryServiceModule } from "./inventory-service.module";
import { NestFactory } from "@nestjs/core";
import { configDotenv } from "dotenv";
configDotenv();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: process.env.RABBITMQ_INVENTORY_INFO_QUEUE || 'inventory-info-queue',
      },
    },
  );
  app.listen();
}

bootstrap();