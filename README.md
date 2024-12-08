# NestJS+TS Based eCommerce Project

This monorepo project is a microservices-based architecture implemented using NestJS. It features services that communicate asynchronously through RabbitMQ and an API Gateway that acts as the entry point for external requests. The project uses TypeORM for database integration, leveraging Postgres as the database. TypeORM provides a robust and efficient way to manage database operations, ensuring data consistency and integrity. This ecommerce project is designed with scalability in mind to handle millions of orders efficiently.

---

## Quick Links

- [Project Overview](#project-overview)
- [Scope](#scope)
- [Folder Structure](#folder-structure)
- [Example Flow: Create Order](#example-flow-create-order)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)
- [Assumptions](#assumptions)
- [Locally Run Project](#locally-run-project)

---

## Project Overview

- Microservices with async communication using RabbitMQ.
- An API Gateway for handling client requests and forwarding them to the appropriate services.
- Modular structure for scalability and maintainability.
- Database integration using TypeORM for efficient data management (Postgres)
- The foundation for building a robust, production-ready application.

### Scope

1. API Gateway

   - Listens to HTTP requests and forwards them to message queues/microservices.

2. Order Management Service

   - Processes order-related messages from RabbitMQ.
   - Interacts with other services (e.g., Customer and Inventory) for data aggregation.
   - Interacts with the database

3. Customer Service (MOCKED)

   - Provides customer details based on incoming requests.

4. Inventory Service (MOCKED)
   - Responds with product/stock details.

---

## Example Flow: Create Order

1. Client sends a `POST` request to the API Gateway to create a new order.
2. API Gateway validates the request and forwards the order details to the Order Management Service via RabbitMQ.
3. Order Management Service processes the order, checking inventory and customer details.
4. Order Management Service sends a request to the Inventory Service to verify stock availability.
5. Inventory Service responds with the stock status.
6. Order Management Service sends a request to the Customer Service to retrieve customer information.
7. Customer Service responds with customer details.
8. Order Management Service aggregates the data and stores the order data in db.

---

## Folder Structure

```plaintext
nestjs-microservices/
├── apps/
│   ├── api-gateway/       # Handles external HTTP requests
│   ├── order-management/  # Handles order-related processing
│   ├── customer-service/  # Provides customer-related data [MOCKED Response]
│   ├── inventory-service/ # Manages inventory-related data [MOCKED Response]
├── libs/
│   ├── common/            # Shared utilities, constants, and DTOs
├── docker-compose.yml     # RabbitMQ and other services setup
├── README.md              # Project documentation
└── package.json           # Project dependencies and scripts
```

## Locally Run Project

Follow these steps to run the project locally using Docker Compose:

1. **Clone the Repository**  
   Clone the project repository to your local machine

2. **Set Environment Variables**  
   Ensure the `.env` file is present in the project root directory

   ```env
   DB_HOST=postgres-db
   DB_NAME=ecommerce
   DB_USER=postgres
   DB_PASSWORD=postgres
   RABBITMQ_URL=amqp://host.docker.internal:5672
   RABBITMQ_ORDER_QUEUE=order-queue
   RABBITMQ_CUSTOMER_INFO_QUEUE=customer-info-queue
   RABBITMQ_INVENTORY_INFO_QUEUE=inventory-info-queue
   ```

3. **Build and Start Services**  
   Build and start the services using Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. **Access the APIs**

   - API Gateway: [http://localhost:3000/api/v1/orders/health-check](http://localhost:3000)

5. **Stop the Services**  
   To stop the services, press `Ctrl+C` in the terminal and then run:
   ```bash
   docker-compose down
   ```

---
