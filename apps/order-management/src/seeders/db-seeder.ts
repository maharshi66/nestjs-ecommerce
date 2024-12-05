import { createConnection, Connection } from 'typeorm';
import { Order } from '../entities/order.entity';

const ordersData = [
  {
    customerId: 1,
    products: [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 1 }],
    status: 'PROCESSING',
  },
  {
    customerId: 2,
    products: [{ productId: 3, quantity: 1 }],
    status: 'SHIPPED',
  },
  {
    customerId: 3,
    products: [{ productId: 1, quantity: 3 }],
    status: 'DELIVERED',
  },
  {
    customerId: 4,
    products: [{ productId: 2, quantity: 2 }],
    status: 'PROCESSING',
  },
  {
    customerId: 5,
    products: [{ productId: 3, quantity: 2 }],
    status: 'PROCESSING',
  },
];

(async () => {
  let connection: Connection;

  try {
    connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'maharshi',
      password: 'password123',
      database: 'mock-ecommerce',
      entities: [Order],
      synchronize: true,
    });

    const orderRepository = connection.getRepository(Order);

    const insertedOrders = await orderRepository.insert(ordersData);

    console.log(`Inserted ${insertedOrders.identifiers.length} orders into the database.`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
})();