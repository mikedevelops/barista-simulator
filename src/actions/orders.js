export const ADD_ORDER = 'ADD_ORDER';
export const addOrder = order =>
    ({ type: ADD_ORDER, payload: order });

export const COMPLETE_ORDER = 'COMPLETE_ORDER';
export const completeOrder = order =>
    ({ type: COMPLETE_ORDER, payload: order });
