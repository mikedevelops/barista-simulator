import { Map, List } from 'immutable';

const createReceptacle = (id, volume) =>
    Map({ id, volume, contents: List() });

export const createContents = (substanceId, measure) =>
    Map({ id: substanceId, measure });

export const RECEPTACLE_GLASS = 'RECEPTACLE_GLASS';
export const createReceptacleGlass = (volume) =>
    createReceptacle(RECEPTACLE_GLASS, volume);
