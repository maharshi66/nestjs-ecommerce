import { Test, TestingModule } from '@nestjs/testing';
import { OrderManagementController } from './order-management.controller';
import { OrderManagementService } from './order-management.service';

describe('OrderManagementController', () => {
  let orderManagementController: OrderManagementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderManagementController],
      providers: [OrderManagementService],
    }).compile();

    orderManagementController = app.get<OrderManagementController>(OrderManagementController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderManagementController.getHello()).toBe('Hello World!');
    });
  });
});
