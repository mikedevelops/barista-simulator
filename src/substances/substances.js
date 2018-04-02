import { Map } from 'immutable';

const createSubstance = (name) =>
    Map({ name });

/**
 * Water substance name
 * @type {string}
 */
export const SUBSTANCE_WATER = 'SUBSTANCE_WATER';

/**
 * Create Water substance
 */
export const createWaterSubstance = () => createSubstance(SUBSTANCE_WATER);

/**
 * Filtered Coffee substance name
 * @type {string}
 */
export const SUBSTANCE_FILTER_COFFEE = 'SUBSTANCE_FILTERED_COFFEE';

/**
 * Create Filtered Coffee substance
 */
export const createFilteredCoffeeSubstance = () => createSubstance(SUBSTANCE_FILTER_COFFEE);
