import { createValidationScore } from './utilities';
import { validateReceptacle } from './receptacle'
import { validateMeasure } from './measure'

export const validateOrder = (expectedOrder, receivedReceptacle) => {
    // validate receptacle
    let score = validateReceptacle(expectedOrder.get('receptacle'), receivedReceptacle);

    // validate ingredients
    expectedOrder.getIn(['recipe', 'ingredients']).forEach(ingredient => {
        const receivedIngredient = receivedReceptacle.get('contents').find(content =>
                content.getIn(['substance', 'name']) === ingredient.getIn(['substance', 'name']));

        if (receivedIngredient !== undefined) {
            score = validateMeasure(ingredient, receivedIngredient);
        }
    });

    return score;
}
