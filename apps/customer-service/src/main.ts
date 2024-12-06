import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { CustomerServiceModule } from "./customer-service.module";
import { NestFactory } from "@nestjs/core";
import { configDotenv } from "dotenv";
configDotenv();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CustomerServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: process.env.RABBITMQ_CUSTOMER_INFO_QUEUE || 'customer-info-queue',
      },
    },
  );
  app.listen();
}

bootstrap();