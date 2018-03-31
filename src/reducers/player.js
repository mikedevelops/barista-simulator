import { ADD_TO_PLAYER_INVENTORY, FILL_RECEPTACLE, USE_EQUIPMENT } from '../actions/player';
import { List, Map } from 'immutable'

const playerState = Map({
    inventory: List([null, null]),
    activeEquipment: null
});

export default function (state = playerState, action) {
    switch(action.type) {
        case ADD_TO_PLAYER_INVENTORY: {
            const emptyIndex = state.get('inventory').indexOf(null);
            const { payload } = action;

            if (emptyIndex === -1) {
                throw new Error('You can\'t pick that item up, you only have 2 hands!');
            }

            // TODO: Date.now() might be silly
            return state.updateIn(['inventory', emptyIndex], () =>
                payload.set('uid', Date.now()));
        }

        case USE_EQUIPMENT: {
            return state.set('activeEquipment', action.payload);
        }

        case FILL_RECEPTACLE: {
            const { receptacle, measure } = action.payload;
            const index = state.get('inventory').findIndex(item =>
                item.get('uid') === receptacle.get('uid'));
            const contents = state.getIn(['inventory', index]).get('contents');
            const capacity = receptacle.getIn(['volume', 'amount']);
            const volume = contents.reduce((v, c) => v += c.get('amount'), 0);

            const existingContentIndex = contents.findIndex(content => {
                return content.get('substance') === measure.get('substance');
            });

            if (existingContentIndex === -1) {
                return state.updateIn(['inventory', index], item => {
                    return item.update('contents', c => c.push(measure))
                });
            }

            if (volume + measure.get('amount') >= capacity) {
                return state.updateIn(['inventory', index], item =>
                    item.updateIn(['contents', existingContentIndex], c =>
                        c.update('amount', a => capacity)));
            }

            return state.updateIn(['inventory', index], item =>
                item.updateIn(['contents', existingContentIndex], c =>
                    c.update('amount', a =>
                        a += measure.get('amount'))));
        }

        default:
            return state;
    }
}
