export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const addCustomer = (customer) =>
    ({ type: ADD_CUSTOMER, payload: customer });

export const ADD_CUSTOMER_MESSAGES = 'ADD_CUSTOMER_MESSAGES';
export const addCustomerMessages = (customerId, messages) =>
    ({ type: ADD_CUSTOMER_MESSAGES, payload: { customerId, messages } });

export const COMPLETE_CUSTOMER = 'COMPLETE_CUSTOMER';
export const completeCustomer = (customerId) =>
    ({ type: COMPLETE_CUSTOMER, payload: customerId });

export const GIVE_ITEM_TO_CUSTOMER = 'GIVE_ITEM_TO_CUSTOMER';
export const giveItemToCustomer = (item, customerId) =>
    ({ type: GIVE_ITEM_TO_CUSTOMER, payload: { item, customerId } });
