# NestJS Microservices Architecture

This monorepo project is a microservices-based architecture implemented using **NestJS**. It features services that communicate asynchronously through **RabbitMQ** and an **API Gateway** that acts as the entry point for external requests.

---

## Project Overview

- **Microservices** with async communication using RabbitMQ.
- An **API Gateway** for handling client requests and forwarding them to the appropriate services.
- Modular structure for scalability and maintainability.
- The foundation for building a robust, production-ready application.

### Scope

1. **API Gateway**

   - Listens to HTTP requests and forwards them to message queues/microservices.

2. **Order Management Service**

   - Processes order-related messages from RabbitMQ.
   - Interacts with other services (e.g., Customer and Inventory) for data aggregation.

3. **Customer Service**

   - Provides customer details based on incoming requests.

4. **Inventory Service**
   - Responds with product/stock details.

---

## Folder Structure

```plaintext
nestjs-microservices/
├── apps/
│   ├── api-gateway/       # Handles external HTTP requests
│   ├── order-management-service/     # Handles order-related processing
│   ├── customer-service/  # Provides customer-related data [MOCKED Response]
│   ├── inventory-service/ # Manages inventory-related data [MOCKED Response]
├── libs/
│   ├── common/            # Shared utilities, constants, and DTOs
├── docker-compose.yml     # RabbitMQ and other services setup
├── README.md              # Project documentation
└── package.json           # Project dependencies and scripts
```
