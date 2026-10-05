import { YakuChecker } from "../modules/yaku/YakuChecker";
import { casesYakuman } from './yaku/yakuman';
import { casesNormal } from './yaku/normal';
import { TehaiCase } from './testConsts';
import { YakuContext } from '../modules/yaku/YakuContext';
import { TehaiCaseRunner } from './tehaiCaseRunner';
import { YakuDetails } from "../modules/yaku/YakuDetails";
import { BlockHaisList } from "../modules";

type yakuMaps = Map<number, Map<string, number>>;

const testcases: TehaiCase<yakuMaps>[] = [];
casesYakuman.forEach(caseyakuman => testcases.push(caseyakuman));
casesNormal.forEach(casenormal => testcases.push(casenormal));

testcases.forEach(testcase => {
    describe(testcase.desc, () => {
        test(testcase.name, () => {
            const yakuMaps: yakuMaps = new Map();
            const runner: TehaiCaseRunner<yakuMaps> = new TehaiCaseRunner(testcase);
            const blocks:BlockHaisList[] = runner.blocks;
            blocks.forEach((block, index) => {
                const context: YakuContext = new YakuContext(runner.hand, runner.ctx, block);
                const details: YakuDetails = new YakuChecker(context).check();
                if(details.length > 0) yakuMaps.set(index, details.toMap());
            });
            expect(yakuMaps).toEqual(testcase.expected);
        });
    });
});