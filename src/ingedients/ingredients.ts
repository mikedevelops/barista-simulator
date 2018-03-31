import { IMeasure, IIngredient } from '../receipes/recipes';

export const WATER = 'WATER';
export const COFFEE = 'COFFEE';

export type Unit = 'ml'|'g';
export type Coarseness = 'fine'|'coarse';

export const createMeasure = (amount: number, unit: Unit): IMeasure => ({
    amount,
    unit
});

export const createWater = (temperature: number, measure: IMeasure): IIngredient => ({
    id: WATER,
    temperature,
    measure,
    complete: false
});

export const createGroundCoffee = (coarseness: Coarseness, measure: IMeasure): IIngredient => ({
    id: COFFEE,
    measure,
    complete: false
});
