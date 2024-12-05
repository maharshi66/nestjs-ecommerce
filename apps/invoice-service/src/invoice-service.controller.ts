import { Controller, Get } from '@nestjs/common';
import { InvoiceServiceService } from './invoice-service.service';

@Controller()
export class InvoiceServiceController {
  constructor(private readonly invoiceServiceService: InvoiceServiceService) {}

  @Get()
  getHello(): string {
    return this.invoiceServiceService.getHello();
  }
}
