// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { OrderManagementController } from './order-management.controller';
// import { OrderManagementService } from './order-management.service';
// import { Order } from './entities/order.entity';
// import { OrderLineItem } from './entities/order-line-item.entity';
// import { Product } from './entities/product.entity';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get<string>('DB_HOST') || 'localhost',
//         port: configService.get<number>('DB_PORT') || 5432,
//         username: configService.get<string>('DB_USERNAME') || 'maharshi',
//         password: configService.get<string>('DB_PASSWORD') || 'password123',
//         database: configService.get<string>('DB_NAME') || 'mock-ecommerce',
//         entities: [Order, Product, OrderLineItem],
//         synchronize: false,
//       }),
//       inject: [ConfigService],
//     }),
//     TypeOrmModule.forFeature([Order, Product, OrderLineItem]),
//   ],
//   controllers: [OrderManagementController],
//   providers: [OrderManagementService],
// })
// export class OrderManagementModule {}

import { Module } from '@nestjs/common';
import { OrderManagementService } from './order-management.service';  // The service that processes the order
import { OrderManagementController } from './order-management.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'customer-service-queue',
        },
      },
      {
        name: 'INVENTORY_SERVICE',
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
