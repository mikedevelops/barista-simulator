import { validateReceptacleType } from '../../src/validation/receptacle'
import {
    createRegularGlassReceptacle, createRegularMugReceptacle,
    createSmallGlassReceptacle
} from '../../src/items/receptacles'

describe('receptacle validation', () => {
    describe('validateReceptacleType', () => {
        test('should throw an error if the receptacles do not match', () => {
            const recipeReceptacle = createRegularGlassReceptacle();
            const orderReceptacle = createRegularMugReceptacle();

            expect(() => validateReceptacleType(recipeReceptacle, orderReceptacle)).toThrowErrorMatchingSnapshot();
        });

        test('should return true for valid receptacle types', () => {
            const recipeReceptacle = createRegularGlassReceptacle();
            const orderReceptacle = createSmallGlassReceptacle();

            expect(validateReceptacleType(recipeReceptacle, orderReceptacle)).toBe(true);
        });
    });
});
