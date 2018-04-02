import { Map } from 'immutable';

/**
 * Starting point for all validation
 * @type {number}
 */
export const VALIDATION_SCORE_BASE = 10;

/**
 * Create a new Validation score
 */
export const createValidationScore = () =>
    VALIDATION_SCORE_BASE;

/**
 * Subtract from validation score
 * @param validationScore
 * @param weight
 */
export const deductValidationScore = (validationScore, weight) =>
    validationScore - weight;

/**
 * Create Validation Result
 * @param score
 * @param messages
 */
export const createValidationResult = (score, messages) =>
    Map({ score, messages });
