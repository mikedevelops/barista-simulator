import { createWater, Unit, createMeasure, createGroundCoffee } from '../ingedients/ingredients';
import { createReceptacle, Receptacle, IReceptacle } from '../receptacles/receptables';

export const AMERICANO = 'AMERICANO';
export const TAP_WATER = 'TAP_WATER';

export interface IMeasure {
    amount: number;
    unit: Unit;
}

export interface IIngredient {
    id: string;
    temperature?: number;
    measure?: IMeasure;
    texture?: string;
    complete: boolean;
}

export interface IRecipe {
    id: string;
    receptacle: IReceptacle;
    ingredients: IIngredient[];
}

export const createAmericanoRecipe = (): IRecipe => ({
    id: AMERICANO,
    receptacle: createReceptacle('mug', createMeasure(350, 'ml')),
    ingredients: [
        createWater(90, createMeasure(300, 'ml')),
        createGroundCoffee('fine', createMeasure(20, 'g'))
    ]
});

export const createTapWaterRecipe = (): IRecipe => ({
    id: TAP_WATER,
    receptacle: createReceptacle('glass', createMeasure(500, 'ml')),
    ingredients: [
        createWater(5, createMeasure(450, 'ml'))
    ]
});
