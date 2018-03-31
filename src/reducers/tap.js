import { Map } from 'immutable';
import { ACTIVATE_TAP, DISPENSE_FROM_TAP, USE_TAP } from '../actions/equipment'

const tapState = Map({
    active: false,
    activePlayer: null
});

export default function (state = tapState, action) {
    switch (action.type) {
        case ACTIVATE_TAP:
            return state.set('active', true);

        case USE_TAP:
            return state.set('activePlayer', action.payload);

        default:
            return state;
    }
}
