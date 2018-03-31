import { combineReducers, createStore } from 'redux'
import player from './reducers/player'
import tap from './reducers/tap'
import { createAction } from './actions/utilities'
import { addToPlayerInevtory, fillReceptacle, useEquipment } from './actions/player'
import { ACTIVATE_TAP, USE_TAP } from './actions/equipment'
import { createReceptacleGlass } from './items/receptacles'
import { createMillilitresMeasure } from './units/measure'
import { createSubstanceWater, SUBSTANCE_WATER } from './substances/substances'

const store = createStore(combineReducers({
    player, tap
}));

window.pick_up_glass = () => {
    store.dispatch(addToPlayerInevtory(
        createReceptacleGlass(createMillilitresMeasure(500))));
}

window.use_tap = () => {
    store.dispatch(createAction(
        USE_TAP, store.getState().player));

    store.dispatch(useEquipment(store.getState().tap));
}

window.turn_tap_on = () => {
    window.pick_up_glass();
    store.dispatch(createAction(
        ACTIVATE_TAP));
}

// Debug

store.subscribe(() => {
    debug();
});

const playerDebug = document.createElement('div');
playerDebug.id = 'player';
document.body.appendChild(playerDebug);

const tapDebug = document.createElement('div');
tapDebug.id = 'tap';
document.body.appendChild(tapDebug);

function debug () {
    document.getElementById('player').innerHTML =
        `<pre>Player: ${JSON.stringify(store.getState().player.toJSON(), null, 2)}</pre>`;
    document.getElementById('tap').innerHTML =
        `<pre>Tap: ${JSON.stringify(store.getState().tap.toJSON(), null, 2)}</pre>`;
}

debug();

function update (frame) {
    const state = store.getState();

    if (frame % 30 === 0) {
        if (state.tap.get('active')) {
            store.dispatch(fillReceptacle(
                state.player.get('inventory').get(0),
                createMillilitresMeasure(50, SUBSTANCE_WATER)));
        }
    }

    requestAnimationFrame(
        update.bind(null, frame + 1));
}

update(0);
