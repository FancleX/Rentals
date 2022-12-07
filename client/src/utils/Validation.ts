export default class Validation {

    /**
     * Validate string is not empty or composed of spaces.
     * 
     * @param target input string
     * @returns true if the string is neither empty nor spaces, otherwise false
     */
    public static generalStringValidation(target: string): boolean {
        return target !== '' || target.trim() !== '';
    }

    /**
     * Validate string is composed of number only.
     * 
     * @param target input string
     * @returns true if the string is neither empty nor spaces, otherwise false
     */
    public static numberStringValidation(target: string): boolean {
        return this.generalStringValidation(target) && !isNaN(Number(target));
    }

    /**
     * Validate input password
     * 
     * @param target input password
     * @param length password length
     * @returns true is passed validation, otherwise false
     */
    public static passwordValidation(target: string, length: number): boolean {
        return this.generalStringValidation(target) && target.length >= length;
    }

    /**
     * Validate number string input with required length
     * 
     * @param target input string
     * @param length length
     * @returns true is valid, otherwise false
     */
    public static numberStringvalidationWithLength(target: string, length: number): boolean {
        return this.numberStringValidation(target) && target.length >= length;
    }
    
}