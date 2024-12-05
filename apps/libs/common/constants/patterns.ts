//This file contains the patterns for the events and messages in use for interservice communication
export const EVENT_PATTERNS = {
  CREATE_ORDER: 'order.create',
};

export const MESSAGE_PATTERNS = {
    UPDATE_ORDER_STATUS: 'order.update.status',
    UPDATE_TRACKING_INFO: 'order.update.tracking',
    DELETE_ORDER: 'order.delete',
    GET_INVENTORY_DETAILS: 'inventory.get',
    GET_CUSTOMER_DETAILS: 'customer.get',
};
