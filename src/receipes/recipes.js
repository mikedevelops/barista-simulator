import { createRegularGlassReceptacle } from '../items/receptacles'
import { Map, List } from 'immutable';
import { createMillilitresMeasure } from '../units/measure'
import { createWaterSubstance } from '../substances/substances'

export const createRecipe = (name, receptacle, ingredients) =>
    Map({ name, receptacle, ingredients });

export const TAP_WATER = 'TAP_WATER';
export const createTapWaterRecipe = () =>
    Map({
        name: TAP_WATER,
        receptacle: createRegularGlassReceptacle(),
        ingredients: List([
            createMillilitresMeasure(450, createWaterSubstance())
        ])
    });
