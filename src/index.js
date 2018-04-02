import { combineReducers, createStore } from 'redux'
import player from './reducers/player'
import tap from './reducers/tap'
import orders from './reducers/orders'
import customers from './reducers/customers'
import { createAction } from './actions/utilities'
import { addToPlayerInevtory, fillReceptacle, useEquipment } from './actions/player'
import { ACTIVATE_TAP, USE_TAP, DEACTIVATE_TAP } from './actions/equipment'
import { createReceptacleGlass, createRegularGlassReceptacle } from './items/receptacles'
import { createMillilitresWaterMeasure } from './units/measure'
import { createSubstanceWater } from './substances/substances'
import { createCustomer } from './customer/customer'
import { createTapWaterRecipe } from './receipes/recipes'
import { createOrder } from './orders/order'
import { addCustomer, addCustomerMessages, completeCustomer } from './actions/customers'
import { addOrder, completeOrder } from './actions/orders'
import { validateOrder } from './validation/order'
import score from './reducers/score'
import { updateScore } from './actions/score'
import { buildInterface, setup, updateDebugger } from './debug'

const store = createStore(combineReducers({
    player, tap, orders, customers, score
}));

window.pick_up_glass = () => {
    store.dispatch(addToPlayerInevtory(
        createRegularGlassReceptacle()));
}

window.use_tap = () => {
    store.dispatch(createAction(
        USE_TAP, store.getState().player));

    store.dispatch(useEquipment(store.getState().tap));
}

window.turn_tap_on = () => {
    store.dispatch(createAction(
        ACTIVATE_TAP));
}

window.turn_tap_off = () => {
    store.dispatch(createAction(
        DEACTIVATE_TAP));
}

window.create_order = () => {
    const customer = createCustomer('Test customer', Date.now());

    store.dispatch(addCustomer(customer));
    store.dispatch(addOrder(
        createOrder(
            createTapWaterRecipe(),
            customer.get('id'),
            Date.now())));
}

window.complete_order = () => {
    const { player, orders, customers } = store.getState();
    const order = orders.getIn(['active', 0]);
    const score = validateOrder(order, player.getIn(['inventory', 0]));
    const customer = customers.get('active').find(customer =>
        customer.get('id') === order.get('customerId'));

    store.dispatch(updateScore(score.get('score')));
    store.dispatch(addCustomerMessages(customer, score.get('messages')));
    store.dispatch(completeOrder(order));
    store.dispatch(completeCustomer(customer));
}

// Debug

setup();
buildInterface(
    { label: 'pick up glass', func: window.pick_up_glass },
    { label: 'turn tap on', func: window.turn_tap_on },
    { label: 'turn tap off', func: window.turn_tap_off },
    { label: 'create order', func: window.create_order },
    { label: 'complete order', func: window.complete_order }
);

updateDebugger(store);

store.subscribe(() => {
    updateDebugger(store);
});


function update (frame) {
    const state = store.getState();

    if (frame % 30 === 0) {
        if (state.tap.get('active')) {
            try {
                store.dispatch(fillReceptacle(
                    state.player.get('inventory').get(0),
                    createMillilitresWaterMeasure(50)));
            } catch (err) {

            }
        }
    }

    requestAnimationFrame(
        update.bind(null, frame + 1));
}

update(0);
