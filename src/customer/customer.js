import { Map, List } from 'immutable';

export const createCustomer = (name, id, messages = List()) =>
    Map({ name, id, messages, inventory: List() });
