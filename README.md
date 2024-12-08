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

## Assumptions

- The API Gateway will handle all external HTTP requests and route them appropriately.
- RabbitMQ is used for asynchronous communication between services.
- TypeORM is used for database operations with Postgres as the database.
- Mocked services will be replaced with real implementations in the future.
- The system is designed to be scalable and handle high volumes of orders.


---

## Known Limitations

- Mocked Services: The Customer and Inventory services currently provide mocked responses. Full integration with real data sources is pending.
- Error Handling: Comprehensive error handling and retry mechanisms need to be implemented for robust operation.

---

## Future Improvements

- Real Data Integration: Replace mocked responses in Customer and Inventory services with actual data sources.
- Load Testing: Conduct extensive load testing to ensure the system can handle high traffic and large volumes of orders.
- Enhanced Error Handling: Implement advanced error handling and retry logic to improve system reliability.
- Monitoring and Logging: Integrate monitoring and logging tools to track system performance and diagnose issues.

---