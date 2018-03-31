import { Map } from 'immutable';

const createMeasure = (amount, unit, substance) =>
    Map({ amount, unit, substance });

const MEASURE_ML = 'MEASURE_ML';
export const createMillilitresMeasure = (amount, substance = null) =>
    createMeasure(amount, MEASURE_ML, substance);
