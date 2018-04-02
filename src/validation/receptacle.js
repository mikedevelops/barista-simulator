import { createValidationResult, createValidationScore, deductValidationScore } from './utilities'
import { List, Map } from 'immutable';

export const receptacleValidationWeights = {
    TYPE: () => -2
};

export const validateReceptacle = (
    recipeReceptacle,
    orderReceptacle,
    weightMap = receptacleValidationWeights
) => {
    let validationMessages = List();
    let validationScore = createValidationScore();

    try {
        validateReceptacleType(recipeReceptacle, orderReceptacle);
    } catch (err) {
        validationMessages = validationMessages.push(Map({
            message: err.message
        }));
        validationScore = deductValidationScore(
            validationScore,
            weightMap.TYPE());
    }

    return createValidationResult(validationScore, validationMessages);
}

/**
 * Validate Receptacle
 *
 * @param recipeReceptacle
 * @param orderReceptacle
 * @throws
 * @returns boolean
 */
export const validateReceptacleType = (recipeReceptacle, orderReceptacle) => {
    if (recipeReceptacle.get('name') !== orderReceptacle.get('name')) {
        throw new Error(`"${orderReceptacle.get('name')}" is the wrong receptacle. ` +
            `Expected a "${recipeReceptacle.get('name')}".`);
    }

    return true;
}
