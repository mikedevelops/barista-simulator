import { combineReducers, createStore } from 'redux'
import player from './reducers/player'
import tap from './reducers/tap'
import orders from './reducers/orders'
import customers from './reducers/customers'
import { createAction } from './actions/utilities'
import { addToPlayerInevtory, fillReceptacle, removeItemFromPlayerInventory, useEquipment } from './actions/player'
import { ACTIVATE_TAP, USE_TAP, DEACTIVATE_TAP } from './actions/equipment'
import { createReceptacleGlass, createRegularGlassReceptacle } from './items/receptacles'
import { createMillilitresWaterMeasure } from './units/measure'
import { createSubstanceWater } from './substances/substances'
import { createCustomer } from './customer/customer'
import { createTapWaterRecipe } from './receipes/recipes'
import { createOrder } from './orders/order'
import { addCustomer, addCustomerMessages, completeCustomer, giveItemToCustomer } from './actions/customers'
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

window.complete_order = (orderId) => {
    const { player, orders, customers } = store.getState();
    const order = orders.getIn(
        ['active', orders.get('active').findIndex(o => o.get('id') === orderId)]);
    const receptacle = player.getIn(['inventory', 0]);
    const score = validateOrder(order, receptacle);
    const customer = customers.get('active').find(customer =>
        customer.get('id') === order.get('customerId'));

    store.dispatch(updateScore(score.get('score')));
    store.dispatch(addCustomerMessages(customer.get('id'), score.get('messages')));
    store.dispatch(giveItemToCustomer(receptacle, customer.get('id')));
    store.dispatch(removeItemFromPlayerInventory(receptacle.get('id')));
    store.dispatch(completeOrder(order.get('id')));
    store.dispatch(completeCustomer(customer.get('id')));
}

store.subscribe(() => {

});

// DEBUG UI

const receptaclesNode = document.querySelector('.receptacles .content');
const equipmentNode = document.querySelector('.equipment .content');
const ordersNode = document.querySelector('.orders .content');
const customersNode = document.querySelector('.customers .content');
const scoreNode = document.querySelector('.score .content');
const inventoryNode = document.querySelector('.inventory .content');

/**
 * Receptacles
 */
const glass = document.createElement('button');
glass.innerHTML = 'Pick up glass';
glass.addEventListener('click', window.pick_up_glass);
receptaclesNode.appendChild(glass);

/**
 * Equipment
 */
const tapOn = document.createElement('button');
const tapOff = document.createElement('button');
tapOn.innerHTML = 'Turn tap on';
tapOff.innerHTML = 'Turn tap off';
tapOn.addEventListener('click', window.turn_tap_on);
tapOff.addEventListener('click', window.turn_tap_off);
equipmentNode.appendChild(tapOn);
equipmentNode.appendChild(tapOff);

/**
 * Inventory
 */
function updateInventory (inventory) {
    let contents = '';

    inventory.forEach(item => {
        if (item !== null) {
            const c = item.contents.reduce((t, c) => t + c.amount, 0);
            contents += `<pre>${item.name}  (${c}/${item.volume.amount})</pre>`;
        }
    });

    if (inventoryNode.innerHTML !== contents) {
        inventoryNode.innerHTML = contents;
    }
}

/**
 * Score
 */
function updateTheScore (scores) {
    let total = 0;

    scores.forEach(score => {
        total += score;
    });

    const theScore = scores.length ? (total / scores.length) * 10 : 0;
    const content = `<pre>${theScore}%</pre>`;

    if (scoreNode.innerHTML !== content) {
        scoreNode.innerHTML = content;
    }
}

/**
 * Orders
 */
function updateOrders (activeOrders) {
    let contents = '';

    activeOrders.forEach(order => {
        contents += `<pre>${order.recipe.name} <button onclick="window.complete_order(${order.id})">complete</button></pre>`;
    });

    if (ordersNode.innerHTML !== contents) {
        ordersNode.innerHTML = contents;
    }
}

/**
 * Update
 */
function update (frame) {
    const state = store.getState();

    updateInventory(state.player.toJS().inventory);
    updateOrders(state.orders.toJS().active);
    updateTheScore(state.score.toJS());

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

