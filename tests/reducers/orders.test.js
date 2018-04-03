import { ADD_ORDER, addOrder, COMPLETE_ORDER, completeOrder } from '../../src/actions/orders'
import orderReducer from '../../src/reducers/orders'
import { createStore } from 'redux'
import { createOrder } from '../../src/orders/order'
import { createTapWaterRecipe } from '../../src/receipes/recipes'

describe('orders reducer', () => {
    let store;

    beforeEach(() => {
        store = createStore(orderReducer);
    });

    describe(ADD_ORDER, () => {
        test('should add an order to the active list', () => {
            const order = createOrder(createOrder(
                createTapWaterRecipe(),
                'test_customer_id',
                666));

            store.dispatch(addOrder(order));
            expect(store.getState().get('active').count()).toBe(1);
            expect(store.getState().get('active').get(0)).toBe(order);

            store.dispatch(addOrder(order));
            expect(store.getState().get('active').count()).toBe(2);
            expect(store.getState().get('active').get(1)).toBe(order);
        });
    });

    describe(COMPLETE_ORDER, () => {
        test('should remove the order from the active list and add to the complete list', () => {
            const order = createOrder(createOrder(
                createTapWaterRecipe(),
                'test_customer_id',
                666));

            store.dispatch(addOrder(order));
            store.dispatch(completeOrder(order));

            expect(store.getState().get('active').count()).toBe(0);
            expect(store.getState().get('complete').count()).toBe(1);
            expect(store.getState().get('complete').get(0)).toBe(order);
        });
    });
});
