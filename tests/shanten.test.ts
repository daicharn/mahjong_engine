import { Hai } from '../modules/Hai';
import { cases1 } from './shanten/test1';
import { ShantenCalculator } from '../modules/ShantenCalculator';

type ShantenCase = {
    name: string,
    hais: number[],
    expected: number
};

const testcases: Map<string, ShantenCase[]> = new Map();
testcases.set("case1", cases1);

testcases.forEach((value, key) => {
    describe(key, () => {
        test.each(value)('$name', ({hais, expected}) => {
            const results = new ShantenCalculator(hais.map(n => new Hai(n))).calculate();
            expect(results).toEqual(expected);
        });
    });
});
