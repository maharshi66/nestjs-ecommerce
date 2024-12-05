import { Module } from '@nestjs/common';
import { OrderManagementService } from './order-management.service';
import { OrderManagementController } from './order-management.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_MANAGEMENT_SERVICE } from 'apps/libs/common/constants/services';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_MANAGEMENT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'orders-queue',
        },
      },
    ]),
  ],
  controllers: [OrderManagementController],
  providers: [OrderManagementService],
})
export class OrderManagementModule {}
