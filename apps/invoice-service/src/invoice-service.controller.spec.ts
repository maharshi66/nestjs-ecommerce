import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceServiceController } from './invoice-service.controller';
import { InvoiceServiceService } from './invoice-service.service';

describe('InvoiceServiceController', () => {
  let invoiceServiceController: InvoiceServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceServiceController],
      providers: [InvoiceServiceService],
    }).compile();

    invoiceServiceController = app.get<InvoiceServiceController>(InvoiceServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(invoiceServiceController.getHello()).toBe('Hello World!');
    });
  });
});
