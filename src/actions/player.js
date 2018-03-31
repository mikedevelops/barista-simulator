export const ADD_TO_PLAYER_INVENTORY = 'ADD_TO_PLAYER_INVENTORY';
export const addToPlayerInevtory = (receptacle) =>
    ({ type: ADD_TO_PLAYER_INVENTORY, payload: receptacle });

export const USE_EQUIPMENT = 'USE_EQUIPMENT';
export const useEquipment = (equipment) =>
    ({ type: USE_EQUIPMENT, payload: equipment });

export const FILL_RECEPTACLE = 'FILL_RECEPTACLE';
export const fillReceptacle = (receptacle, measure) =>
    ({ type: FILL_RECEPTACLE, payload: { receptacle, measure } });

