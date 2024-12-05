import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { InventoryServiceModule } from "./inventory-service.module";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'inventory-service-queue',
      },
    },
  );
  app.listen();
}

bootstrap();