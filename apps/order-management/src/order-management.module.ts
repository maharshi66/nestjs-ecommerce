import { Module } from '@nestjs/common';
import { OrderManagementService } from './order-management.service';  // The service that processes the order
import { OrderManagementController } from './order-management.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CUSTOMER_SERVICE, INVENTORY_SERVICE } from 'apps/libs/common/constants/services';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CUSTOMER_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'customer-service-queue',
        },
      },
      {
        name: INVENTORY_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'inventory-service-queue',
        },
      },
    ]),
  ],
  controllers: [OrderManagementController],
  providers: [OrderManagementService],
})
export class OrderManagementModule {}
