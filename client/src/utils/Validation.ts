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
        const result = this.generalStringValidation(target) && !isNaN(Number(target));
        console.log(result)
        return result;
    }
    
}