import { Map } from 'immutable';
import { createFilteredCoffeeSubstance, createWaterSubstance } from '../substances/substances'

/**
 * Create measure
 * @param amount
 * @param unit
 * @param substance
 */
const createMeasure = (amount, unit, substance) =>
    Map({ amount, unit, substance });

/**
 * Millilitre name
 * @type {string}
 */
const MEASURE_ML = 'MEASURE_ML';

/**
 * Create Millilitre measure
 * @param amount
 * @param substance
 */
export const createMillilitresMeasure = (amount, substance = null) =>
    createMeasure(amount, MEASURE_ML, substance);

/**
 * Create a Millilitre Water measure
 * @param amount
 */
export const createMillilitresWaterMeasure = (amount) =>
    createMillilitresMeasure(amount, createWaterSubstance());

/**
 * Create a Millilitre Filtered Coffee measure
 * @param amount
 */
export const createMillilitreFilteredCoffeeMeasure = (amount) =>
    createMillilitresMeasure(amount, createFilteredCoffeeSubstance());
