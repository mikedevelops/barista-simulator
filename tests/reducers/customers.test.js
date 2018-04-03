import customersReducer from '../../src/reducers/customers';
import { createStore } from 'redux'
import { ADD_CUSTOMER, ADD_CUSTOMER_MESSAGES, COMPLETE_CUSTOMER } from '../../src/actions/customers'

describe('customers reducer', () => {
    let store;

    beforeEach(() => {
        store = createStore(customersReducer);
    });

    describe(ADD_CUSTOMER, () => {

    });

    describe(ADD_CUSTOMER_MESSAGES, () => {

    });

    describe(COMPLETE_CUSTOMER, () => {

    });
});
