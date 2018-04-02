import { List, Map } from 'immutable';
import { ADD_CUSTOMER, ADD_CUSTOMER_MESSAGES, COMPLETE_CUSTOMER } from '../actions/customers'

const customersState = Map({
    active: List(),
    complete: List()
});

export default function (state = customersState, action) {
    switch (action.type) {
        case ADD_CUSTOMER:
            return state.update('active', a => a.push(action.payload));

        case ADD_CUSTOMER_MESSAGES: {
            const { customer, messages } = action.payload;
            const customerIndex = state.get('active').findIndex(c =>
                c.get('id') === customer.get('id'));

            return state.updateIn(['active', customerIndex, 'messages'], m =>
                m.concat(messages));
        }

        case COMPLETE_CUSTOMER: {
            const customerIndex = state.get('active').findIndex(c =>
                c.get('id') === action.payload.get('id'));

            return state
                .update('active', a => a.delete(customerIndex))
                .update('complete', c => c.push(action.payload));
        }


        default:
            return state;
    }
}
