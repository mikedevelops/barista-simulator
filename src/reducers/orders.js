import { List, Map } from 'immutable';
import { ADD_ORDER, COMPLETE_ORDER } from '../actions/orders'

const orderState = Map({
    active: List(),
    complete: List()
});

export default function (state = orderState, action) {
    switch (action.type) {
        case ADD_ORDER:
            return state.updateIn(['active'], a => a.push(action.payload));

        case COMPLETE_ORDER:
            const orderIndex = state.get('active').findIndex(o =>
                o.get('id') === action.payload);
            const order = state.getIn(['active', orderIndex]);

            return state
                .update('active', a => a.delete(orderIndex))
                .update('complete', c => c.push(order));

        default:
            return state;
    }
}
