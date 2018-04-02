import { Map } from 'immutable'
import { ACTIVATE_TAP, DEACTIVATE_TAP, USE_TAP } from '../actions/equipment'

const tapState = Map({
    active: false,
    activePlayer: null
});

export default function (state = tapState, action) {
    switch (action.type) {
        case ACTIVATE_TAP:
            return state.set('active', true);

        case DEACTIVATE_TAP:
            return state.set('active', false);

        case USE_TAP:
            return state.set('activePlayer', action.payload);

        default:
            return state;
    }
}
