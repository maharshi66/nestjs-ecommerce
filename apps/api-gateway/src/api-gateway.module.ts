import { Module } from '@nestjs/common';
import { OrderManagementModule } from './order-management/order-management.module';

@Module({
  imports: [OrderManagementModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
