export default class Validation {

    /**
     * Validate string is not empty or composed of spaces
     */
    static generalStringValidation(target: string): boolean {
        return target !== '' || target.trim() !== '';
    };

    /**
     * Validate string is composed of number only
     */
    static numberStringValidation(target: string): boolean {
        const result = this.generalStringValidation(target) && !isNaN(Number(target));
        console.log(result)
        return result;
    };

}