import { UPDATE_SCORE } from '../actions/score'
import { List } from 'immutable';

const scoreState = List();

export default function (state = scoreState, action) {
    switch (action.type) {
        case UPDATE_SCORE:
            return state.push(action.payload);

        default:
            return state;
    }
}
