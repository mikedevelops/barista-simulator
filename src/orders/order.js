import { Map } from 'immutable';

export const createOrder = (recipe, customerId, time) =>
    Map({ recipe, customerId, time, id: Date.now() });
