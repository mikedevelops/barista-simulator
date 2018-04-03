import { List, Map } from 'immutable';
import { ADD_CUSTOMER, ADD_CUSTOMER_MESSAGES, COMPLETE_CUSTOMER, GIVE_ITEM_TO_CUSTOMER } from '../actions/customers'

const customersState = Map({
    active: List(),
    complete: List()
});

export default function (state = customersState, action) {
    switch (action.type) {
        case ADD_CUSTOMER:
            return state.update('active', a => a.push(action.payload));

        case ADD_CUSTOMER_MESSAGES: {
            const { customerId, messages } = action.payload;
            const customerIndex = state.get('active').findIndex(c =>
                c.get('id') === customerId);

            return state.updateIn(['active', customerIndex, 'messages'], m =>
                m.concat(messages));
        }

        case COMPLETE_CUSTOMER: {
            const customerIndex = state.get('active').findIndex(c =>
                c.get('id') === action.payload);
            const customer = state.getIn(['active', customerIndex]);

            return state
                .update('active', a => a.delete(customerIndex))
                .update('complete', c => c.push(customer));
        }

        case GIVE_ITEM_TO_CUSTOMER:
            const { customerId, item } = action.payload;
            const customerIndex = state.get('active').findIndex(c =>
                c.get('id') === customerId);

            return state.updateIn(['active', customerIndex, 'inventory'], i =>
                i.push(item));

        default:
            return state;
    }
}
