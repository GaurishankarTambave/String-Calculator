import { StatusCode } from "../enum/statusCode";
import { successMessages } from "../enum/successMessage";
export class StringCalculator {
     add(numbersString: string) {
        if (numbersString === '') {
            return { data: { addition: 0 }, success: true, statusCode: StatusCode.SUCCESS, message: successMessages.SUCCESS };
        }
        
        let delimiter = /[,\n]/;
        const delimiterMatch = numbersString.match(/^\/\/(.+?)\n/);
    
        if (delimiterMatch) {
            const customDelimiter = delimiterMatch[1].replace(/[\[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            delimiter = new RegExp(`[${customDelimiter},\\n]`);
            numbersString = numbersString.slice(delimiterMatch[0].length);
        }
    
        let numberArray = numbersString.split(delimiter);
    
        let negatives: number[] = [];
        let total = numberArray.reduce((accumulator: number, currentValue: string) => {
            const num = Number(currentValue);
            if (num < 0) {
                negatives.push(num);
            }
    
            return accumulator + (isNaN(num) ? 0 : num);
        }, 0);
    
        if (negatives.length > 0) {
            return {success: false, statusCode: StatusCode.BADREQUEST, message: 'Negative numbers not allowed: ' + negatives.join(", ") };
        }
    
        return { data: { addition: total }, success: true, statusCode: StatusCode.SUCCESS, message: successMessages.SUCCESS };
    }
    
}