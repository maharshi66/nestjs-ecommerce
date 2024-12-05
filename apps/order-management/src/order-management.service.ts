// // order-management.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Order } from './entities/order.entity';
// import { Product } from './entities/product.entity';
// import { OrderLineItem } from './entities/order-line-item.entity';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';

// @Injectable()
// export class OrderManagementService {
//   constructor(
//     @InjectRepository(Order)
//     private readonly orderRepository: Repository<Order>,
//     @InjectRepository(Product)
//     private readonly productRepository: Repository<Product>,
//     @InjectRepository(OrderLineItem)
//     private readonly orderLineItemRepository: Repository<OrderLineItem>,
//   ) {}

//   async getAllOrders(): Promise<Order[]> {
//     return this.orderRepository.find({ relations: ['orderLineItems', 'orderLineItems.product'] });
//   }

//   async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
//     const { order_number, status, shipping_address, tracking_company, tracking_number, products } = createOrderDto;

//     const order = this.orderRepository.create({
//       order_number,
//       status,
//       shipping_address,
//       tracking_company,
//       tracking_number,
//     });

//     await this.orderRepository.save(order);

//     const orderLineItems = products.map((product) => {
//       return this.orderLineItemRepository.create({
//         order: { id: order.id },
//         product: { id: product.product_id },
//         quantity: product.quantity,
//         price: product.price,
//       });
//     });

//     await this.orderLineItemRepository.save(orderLineItems);

//     return order;
//   }

//   async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
//     const order = await this.orderRepository.findOne({ where: { id } });
//     if (!order) {
//       throw new Error('Order not found');
//     }

//     // Update order details
//     Object.assign(order, updateOrderDto);
//     await this.orderRepository.save(order);

//     return order;
//   }

//   async deleteOrder(id: string): Promise<void> {
//     const order = await this.orderRepository.findOne({ where: { id } });
//     if (!order) {
//       throw new Error('Order not found');
//     }

//     await this.orderRepository.remove(order);
//   }
// }
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class OrderManagementService {
  constructor(@Inject('CUSTOMER_SERVICE') private readonly customerClient: ClientProxy, 
  @Inject('INVENTORY_SERVICE') private readonly inventoryClient: ClientProxy) {
    // RabbitMQ Clients for Customer and Inventory Services
    // this.customerClient = ClientProxyFactory.create({
    //   transport: Transport.RMQ,
    //   options: {
    //     urls: ['amqp://localhost:5672'],
    //     queue: 'customer-service-queue',
    //   },
    // });

    // this.inventoryClient = ClientProxyFactory.create({
    //   transport: Transport.RMQ,
    //   options: {
    //     urls: ['amqp://localhost:5672'],
    //     queue: 'inventory-request-queue',
    //   },
    // });
  }

  async handleOrderPlaced(order: any) {
    console.log(`Received a new order - customer: ${order}`);

    const customerDetails = await this.customerClient.send('customer.get', 'CUST01').toPromise();
    console.log('Customer details:', customerDetails);

    const inventoryDetails = await this.inventoryClient.send('inventory.get', 'INV01').toPromise();
    console.log('Inventory details:', inventoryDetails);
  }
}
