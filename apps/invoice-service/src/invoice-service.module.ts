import { Module } from '@nestjs/common';
import { InvoiceServiceController } from './invoice-service.controller';
import { InvoiceServiceService } from './invoice-service.service';

@Module({
  imports: [],
  controllers: [InvoiceServiceController],
  providers: [InvoiceServiceService],
})
export class InvoiceServiceModule {}
