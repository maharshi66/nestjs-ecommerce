import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { MESSAGE_PATTERNS } from 'apps/libs/common/constants/patterns';
import { CUSTOMER_SERVICE, INVENTORY_SERVICE } from 'apps/libs/common/constants/services';
import { CreateOrderDto } from 'apps/libs/common/dto/create-order.dto';
import { UpdateOrderDto } from 'apps/libs/common/dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderLineItem } from './entities/order-line-item.entity';
import { OrderStatus } from 'apps/libs/common/constants/order-status';
@Injectable()
export class OrderManagementService {
  constructor(
    @Inject(CUSTOMER_SERVICE) private readonly customerClient: ClientProxy,
    @Inject(INVENTORY_SERVICE) private readonly inventoryClient: ClientProxy,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderLineItem) private readonly orderLineItemRepository: Repository<OrderLineItem>,
    private readonly dataSource: DataSource,
  ) {}

  async handleGetAllOrders() {
    console.log('Fetching all orders');

    try {
      const orders = await this.orderRepository.find();
      console.log('Orders:', orders);
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      throw new RpcException('Error fetching orders');
    }
  }

  async handleGetOrderById(getOrderByIdDto: any) {
    const { orderId } = getOrderByIdDto;
    console.log(`Fetching order by ID: ${orderId}`);

    try {
      const order = await this.orderRepository.findOne({ where: { id: orderId } });

      if (!order) {
        throw new RpcException(`Order with ID ${orderId} not found`);
      }

      console.log('Order:', order);
      return order;
    } catch (error) {
      console.error('Error fetching order:', error.message);
      throw new RpcException('Error fetching order');
    }
  }

  async handleCreateOrder(order: CreateOrderDto) {
    console.log(`Received a new order - customer: ${order}`);

    try {
      const customerDetails = await this.customerClient.send(MESSAGE_PATTERNS.GET_CUSTOMER_DETAILS, order.customerId).toPromise();
      console.log('Customer details:', customerDetails);

      const inventoryDetails = await this.inventoryClient.send(MESSAGE_PATTERNS.GET_INVENTORY_DETAILS, order.items).toPromise();
      console.log('Inventory details:', inventoryDetails);

      const products = inventoryDetails.map((inventory) => {
        const { id, requested_quantity } = inventory;
        return {
          product_id: id,
          product_name: inventory.name,
          quantity: requested_quantity,
          unit_price: inventory.unit_price,
        };
      });

      // Calculate total amount
      const totalAmount = products.reduce(
        (total, product) => total + product.quantity * product.unit_price,
        0,
      );
      const lineItems = inventoryDetails.map((inventory) => ({
        product_id: inventory.id,
        product_name: inventory.name,
        quantity: inventory.requested_quantity,
        unit_price: inventory.unit_price,
      }));

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // Save the order
        const savedOrder = await queryRunner.manager.save(Order, {
          customer_id: customerDetails.id,
          shipping_address: customerDetails.shipping_address,
          status: OrderStatus.PROCESSING,
          total_amount: totalAmount,
        });

        console.log('Order saved:', savedOrder);

        // Save order line items
        const orderLineItems = lineItems.map((item) => ({
          order: savedOrder,
          product_id: item.product_id,
          product_name: item.product_name,
          quantity: item.quantity,
          unit_price: item.unit_price,
        }));

        await queryRunner.manager.save(OrderLineItem, orderLineItems);

        console.log('Order line items saved:', orderLineItems);

        await queryRunner.commitTransaction();
        console.log('Transaction committed successfully.');
      } catch (error) {
        console.error('Error during transaction:', error.message);
        await queryRunner.rollbackTransaction();
        throw new RpcException('Error creating order');
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      console.error('Error creating order:', error.message);
      throw new RpcException('Error creating order');
    }
  }

  async handleOrderUpdate(updateOrderDto: UpdateOrderDto) {
    const { orderId } = updateOrderDto;
    console.log(`Updating order - ID: ${orderId}, update: ${updateOrderDto}`);

    try {
      const order = await this.orderRepository.findOne({ where: { id: orderId } });

      if (!order) {
        throw new RpcException(`Order with ID ${orderId} not found`);
      }

      if (updateOrderDto.status) {
        order.status = updateOrderDto.status;
      }

      if (updateOrderDto.trackingNumber) {
        order.tracking_number = updateOrderDto.trackingNumber;
      }

      if (updateOrderDto.trackingCompany) {
        order.tracking_company = updateOrderDto.trackingCompany;
      }

      const updatedOrder = await this.orderRepository.save(order);
      console.log('Order updated:', updatedOrder);
      return updatedOrder;
    } catch (error) {
      console.error('Error updating order:', error.message);
      throw new RpcException('Error updating order');
    }
  }

  async handleDeleteOrder(orderId: string) {
    console.log(`Deleting order - ID: ${orderId}`);

    try {
      const order = await this.orderRepository.findOne({ where: { id: orderId } });

      if (!order) {
        throw new RpcException(`Order with ID ${orderId} not found`);
      }

      await this.orderRepository.remove(order);
      console.log(`Order with ID ${orderId} deleted successfully.`);
      return { message: `Order with ID ${orderId} deleted successfully.` };
    } catch (error) {
      console.error('Error deleting order:', error.message);
      throw new RpcException('Error deleting order');
    }
  }
}