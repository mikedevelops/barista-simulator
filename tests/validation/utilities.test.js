import { createValidationScore } from '../../src/validation/utilities'

describe('validation utilities', () => {
    describe('createValidationScore', () => {
        test('should be a number', () => {
            expect(typeof createValidationScore()).toBe('number');
        });
    });
});
