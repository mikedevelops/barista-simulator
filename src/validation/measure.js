import { createValidationResult, createValidationScore, deductValidationScore } from './utilities'
import { List, Map } from 'immutable';

/**
 * Measure validation weight map
 * @type {*}
 */
export const measureValidationWeights = {
    AMOUNT: (expected, received) => {
        let diff = expected - received;

        if (diff < 0) {
            diff = diff * -1;
        }

        if (diff > 50) {
            return 3;
        }

        if (diff > 25) {
            return 2;
        }

        if (diff > 10) {
            return 1;
        }
    },
    SUBSTANCE: 3
};

/**
 * Validate a full measure
 *
 * @param recipeMeasure
 * @param orderMeasure
 * @param weightMap
 */
export const validateMeasure = (
    recipeMeasure,
    orderMeasure,
    weightMap = measureValidationWeights
) => {
    let validationMessages = List();
    let validationScore = createValidationScore();

    try {
        validateMeasureAmount(recipeMeasure, orderMeasure);
    } catch (err) {
        validationMessages = validationMessages.push(Map({
            message: err.message
        }));
        validationScore = deductValidationScore(
            validationScore,
            weightMap.AMOUNT(
                recipeMeasure.get('amount'),
                orderMeasure.get('amount')));
    }

    try {
        validateMeasureSubstance(recipeMeasure, orderMeasure);
    } catch (err) {
        validationMessages = validationMessages.push(Map({
            message: err.message
        }));
        validationScore = deductValidationScore(
            validationScore,
            weightMap.SUBSTANCE);
    }

    return createValidationResult(validationScore, validationMessages);
};

/**
 * Validate measure amount
 *
 * @param recipeMeasure
 * @param orderMeasure
 * @returns {boolean}
 */
export const validateMeasureAmount  = (recipeMeasure, orderMeasure) => {
    const recipeMeasureAmount = recipeMeasure.get('amount');
    const orderMeasureAmount = orderMeasure.get('amount');

    if (recipeMeasureAmount !== orderMeasureAmount) {
        throw new Error(`"${orderMeasureAmount}" is the wrong amount. ` +
            `Expected "${recipeMeasureAmount}"`);
    }

    return true;
}

/**
 * Validate Measure substance
 *
 * @param recipeMeasure
 * @param orderMeasure
 * @throws
 * @returns {boolean}
 */
export const validateMeasureSubstance  = (recipeMeasure, orderMeasure) => {
    const recipeMeasureSubstance = recipeMeasure.getIn(['substance', 'name']);
    const orderMeasureSubstance = orderMeasure.getIn(['substance', 'name']);

    if (recipeMeasureSubstance !== orderMeasureSubstance) {
        throw new Error(`"${orderMeasureSubstance}" is the wrong substance. ` +
            `Expected "${recipeMeasureSubstance}"`);
    }

    return true;
}
