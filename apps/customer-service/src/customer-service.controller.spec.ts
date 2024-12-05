import { Test, TestingModule } from '@nestjs/testing';
import { CustomerServiceController } from './customer-service.controller';
import { CustomerServiceService } from './customer-service.service';

describe('CustomerServiceController', () => {
  let customerServiceController: CustomerServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerServiceController],
      providers: [CustomerServiceService],
    }).compile();

    customerServiceController = app.get<CustomerServiceController>(CustomerServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(customerServiceController.getHello()).toBe('Hello World!');
    });
  });
});
