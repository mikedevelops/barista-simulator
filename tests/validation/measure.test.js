import { createMillilitreFilteredCoffeeMeasure, createMillilitresWaterMeasure } from '../../src/units/measure'
import { validateMeasure, validateMeasureAmount, validateMeasureSubstance } from '../../src/validation/measure'
import { List, Map, is } from 'immutable';

describe('measure validation', () => {
    describe('validateMeasureAmount', () => {
        test('Should throw if the amounts do not match', () => {
            const recipeMeasure = createMillilitresWaterMeasure(200);
            const orderMeasure = createMillilitresWaterMeasure(201);

            expect(() => validateMeasureAmount(recipeMeasure, orderMeasure)).toThrowErrorMatchingSnapshot();
        });

        test('Should return true if the amounts match', () => {
            const recipeMeasure = createMillilitresWaterMeasure(200);
            const orderMeasure = createMillilitresWaterMeasure(200);

            expect(validateMeasureAmount(recipeMeasure, orderMeasure)).toBe(true);
        });
    });

    describe('validateMeaxsureSubstance', () => {
        test('Should throw if the substance names do not match', () => {
            const recipeMeasure = createMillilitreFilteredCoffeeMeasure(200);
            const orderMeasure = createMillilitresWaterMeasure(200);

            expect(() => validateMeasureSubstance(recipeMeasure, orderMeasure)).toThrowErrorMatchingSnapshot();
        });

        test('Should return true if the substances match', () => {
            const recipeMeasure = createMillilitresWaterMeasure(200);
            const orderMeasure = createMillilitresWaterMeasure(200);

            expect(validateMeasureSubstance(recipeMeasure, orderMeasure)).toBe(true);
        });
    });

    describe('validateMeasure', () => {
        let weightMap;

        beforeEach(() => {
            weightMap = {
                AMOUNT: (expected, received) => Math.floor((expected - received) / 10)
            }
        });

        test('should return the base validation score and no messages for identical measures', () => {
            const recipeMeasure = createMillilitresWaterMeasure(100);
            const orderMeasure = createMillilitresWaterMeasure(100);
            const score = Map({
                score: 10,
                messages: List()
            });

            expect(is(validateMeasure(recipeMeasure, orderMeasure, weightMap), score)).toBe(true);
        });

        test('should return a validation score with messages for invalid measures', () => {
            const recipeMeasure = createMillilitresWaterMeasure(150);
            const orderMeasure = createMillilitresWaterMeasure(100);

            expect(validateMeasure(recipeMeasure, orderMeasure, weightMap).get('score')).toBe(5);
            expect(validateMeasure(recipeMeasure, orderMeasure, weightMap).get('messages').size).toBe(1);
        });
    });
});
