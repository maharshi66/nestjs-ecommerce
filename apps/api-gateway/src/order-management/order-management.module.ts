import { Module } from '@nestjs/common';
import { OrderManagementService } from './order-management.service';
import { OrderManagementController } from './order-management.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_MANAGEMENT_SERVICE } from 'apps/libs/common/constants/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ResponseInterceptor } from 'apps/libs/common/interceptors/response.interceptor';
import { HttpExceptionFilter } from 'apps/libs/common/interceptors/http-exception.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ClientsModule.registerAsync([
      {
        name: ORDER_MANAGEMENT_SERVICE,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get<string>('RABBITMQ_ORDER_QUEUE'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OrderManagementController],
  providers: [OrderManagementService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class OrderManagementModule {}
