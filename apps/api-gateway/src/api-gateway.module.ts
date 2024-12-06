import { Module } from '@nestjs/common';
import { OrderManagementModule } from './order-management/order-management.module';
import  {ConfigModule} from '@nestjs/config';
@Module({
  imports: [OrderManagementModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env'],
  })],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
