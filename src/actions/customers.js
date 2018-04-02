export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const addCustomer = (customer) =>
    ({ type: ADD_CUSTOMER, payload: customer });

export const ADD_CUSTOMER_MESSAGES = 'ADD_CUSTOMER_MESSAGES';
export const addCustomerMessages = (customer, messages) =>
    ({ type: ADD_CUSTOMER_MESSAGES, payload: { customer, messages } });

export const COMPLETE_CUSTOMER = 'COMPLETE_CUSTOMER';
export const completeCustomer = (customer) =>
    ({ type: COMPLETE_CUSTOMER, payload: customer });
