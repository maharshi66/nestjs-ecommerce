//Convention used: domain.action.entity
export const EVENT_PATTERNS = {
  CREATE_ORDER: 'order.create',
  UPDATE_ORDER: 'order.update',
  DELETE_ORDER: 'order.delete',
};

export const MESSAGE_PATTERNS = {
  GET_ALL_ORDERS: 'order.get.all',
  GET_ORDER_BY_ID: 'order.get',
  GET_INVENTORY_DETAILS: 'inventory.get',
  GET_CUSTOMER_DETAILS: 'customer.get',
};
