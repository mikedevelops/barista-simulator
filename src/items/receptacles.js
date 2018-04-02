import { Map, List } from 'immutable';
import { createMillilitresMeasure } from '../units/measure';

/**
 * Create a receptacle
 * @param name
 * @param volume
 */
const createReceptacle = (name, volume) =>
    Map({ name, volume, contents: List() });

export const createContents = (substanceId, measure) =>
    Map({ name: substanceId, measure });

/**
 * Glass receptacle name
 * @type {string}
 */
export const RECEPTACLE_GLASS = 'RECEPTACLE_GLASS';

/**
 * Create a Glass receptacle
 * @param volume
 */
const createGlassReceptacle = (volume) =>
    createReceptacle(RECEPTACLE_GLASS, volume);

/**
 * Create a Regular Glass receptacle
 */
export const createRegularGlassReceptacle = () =>
    createGlassReceptacle(createMillilitresMeasure(500));

/**
 * Create a Small Glass receptacle
 */
export const createSmallGlassReceptacle = () =>
    createGlassReceptacle(createMillilitresMeasure(250));

/**
 * Mug receptacle name
 * @type {string}
 */
export const RECEPTACLE_MUG = 'RECEPTACLE_MUG';

/**
 * Create Mug receptacle
 * @param volume
 */
const createMugReceptacle = (volume) =>
    createReceptacle(RECEPTACLE_MUG, volume);

/**
 * Create Regular Mug receptacle
 */
export const createRegularMugReceptacle = () =>
    createMugReceptacle(createMillilitresMeasure(300));
