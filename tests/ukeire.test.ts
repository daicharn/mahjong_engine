import { Hai, Hais } from "../modules";
import { UkeireCalculator } from "../modules/efficiency/UkeireCalculator";
import { UkeireDetail } from "../modules/efficiency/UkeireDetail";
import { UkeireCase } from "./testConsts";
import { casesNoSpecial } from "./ukeire/nospecial";
import { casesAll } from "./ukeire/all";

const testcases: Map<string, UkeireCase[]> = new Map();
testcases.set("七対子国士なし", casesNoSpecial);
testcases.set("七対子国士あり", casesAll);

testcases.forEach((value, key) => {
    describe(key, () => {
        test.each(value)('$name', ({haiNum, noSpecial, expected}) => {
            const hais: Hai[] = new Hais(haiNum).getHais()
            const ukeire: UkeireDetail[] = new UkeireCalculator(hais, noSpecial).calculate();
            const results = ukeire.map(detail => detail.hai);
            expect(results).toEqual(expected);
        });
    });
});