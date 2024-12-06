import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderManagementService } from './order-management.service';
import { OrderManagementController } from './order-management.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CUSTOMER_SERVICE, INVENTORY_SERVICE } from 'apps/libs/common/constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ClientsModule.registerAsync([
      {
        name: CUSTOMER_SERVICE,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get<string>('RABBITMQ_CUSTOMER_INFO_QUEUE'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: INVENTORY_SERVICE,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get<string>('RABBITMQ_INVENTORY_INFO_QUEUE'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OrderManagementController],
  providers: [OrderManagementService],
})
export class OrderManagementModule {}
