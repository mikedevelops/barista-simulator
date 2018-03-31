import { Map } from 'immutable';

const createEquipment = (id) =>
    Map({ id });

export const EQUIPMENT_TAP = 'EQUIPMENT_TAP';
export const createEquipmentTap = () =>
    createEquipment(EQUIPMENT_TAP);
