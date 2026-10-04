import { Hai } from '../modules/Hai';
import { casesNormal } from './shanten/normal';
import { casesChitoi } from './shanten/chitoitsu';
import { casesKokushi } from './shanten/kokushi';
import { ShantenCalculator } from '../modules/ShantenCalculator';

type ShantenCase = {
    name: string,
    hais: number[],
    expected: number
};

const testcases: Map<string, ShantenCase[]> = new Map();
testcases.set("normal", casesNormal);
testcases.set("chitoitsu", casesChitoi);
testcases.set("kokushi", casesKokushi);

testcases.forEach((value, key) => {
    describe(key, () => {
        test.each(value)('$name', ({hais, expected}) => {
            const results = new ShantenCalculator(hais.map(n => new Hai(n))).calculate();
            expect(results).toEqual(expected);
        });
    });
});
