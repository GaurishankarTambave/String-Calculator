import { expect } from "chai";
import { StringCalculator } from "../src/calculator";

describe('String Calculator Unit Tests', () => {
    
    const calculator = new StringCalculator()

    it('Test No- 1: Should return 0 as blank string is provided to add', () =>  {
        const result: any = calculator.add("");
        expect(result.success).to.be.true;
        expect(result.statusCode).to.be.eqls(200);
        expect(result.data.addition).to.be.eqls(0);
        expect(result.message).to.be.eqls('Addition of numbers is successfully computed');
    });

    it('Test No- 2: Should return the number itself for a single number', () =>  {
        const result: any = calculator.add("6");
        expect(result.success).to.be.true;
        expect(result.statusCode).to.be.eqls(200);
        expect(result.data.addition).to.be.eqls(6);
        expect(result.message).to.be.eqls('Addition of numbers is successfully computed');
    });

    it('Test No- 3: Should add two numbers with comma separators', () =>  {
        const result: any = calculator.add("5,5");
        expect(result.success).to.be.true;
        expect(result.statusCode).to.be.eqls(200);
        expect(result.data.addition).to.be.eqls(10);
        expect(result.message).to.be.eqls('Addition of numbers is successfully computed');
    });

    it('Test No- 4: Should handle new lines between numbers', () =>  {
        const result: any = calculator.add("1\n2\n3\n4,5");
        expect(result.success).to.be.true;
        expect(result.statusCode).to.be.eqls(200);
        expect(result.data.addition).to.be.eqls(15);
        expect(result.message).to.be.eqls('Addition of numbers is successfully computed');
    });

    it('Test No- 5: Should support custom delimiters', () =>  {
        let result: any = calculator.add("//;\n1;2");
        expect(result.success).to.be.true;
        expect(result.statusCode).to.be.eqls(200);
        expect(result.data.addition).to.be.eqls(3);
        expect(result.message).to.be.eqls('Addition of numbers is successfully computed');

        result = calculator.add("//|\n1|2|3");
        expect(result.success).to.be.true;
        expect(result.statusCode).to.be.eqls(200);
        expect(result.data.addition).to.be.eqls(6);
        expect(result.message).to.be.eqls('Addition of numbers is successfully computed');
    });

    it('Test No- 6: Should handle complex cases with custom delimiters', () =>  {
        let result: any = calculator.add("//[***]\n1***2***3");
        expect(result.success).to.be.true;
        expect(result.statusCode).to.be.eqls(200);
        expect(result.data.addition).to.be.eqls(6);
        expect(result.message).to.be.eqls('Addition of numbers is successfully computed');

        result = calculator.add("//[*]\n1*2*3");
        expect(result.success).to.be.true;
        expect(result.statusCode).to.be.eqls(200);
        expect(result.data.addition).to.be.eqls(6);
        expect(result.message).to.be.eqls('Addition of numbers is successfully computed');
    });

    it('Test No- 7: show all negative numbers in the error message', () =>  {
        const result: any = calculator.add("1,-2,-3,9,-7");
        expect(result.success).to.be.false;
        expect(result.statusCode).to.be.eqls(400);
        expect(result.message).to.be.eqls('Negative numbers not allowed: -2, -3, -7');
    });

});