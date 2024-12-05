import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { CustomerServiceModule } from "./customer-service.module";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CustomerServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'customer-service-queue',
      },
    },
  );
  app.listen();
}

bootstrap();