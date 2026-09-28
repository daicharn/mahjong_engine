import { hanNameCase } from "./testConsts";
import { casesHanName } from './tensuu/hanName';
import { BlockHaisList, Hai, PlayerContext, PlayerHand, ScoreResolver, TILE, YakuContext } from "../modules";

const testcases: hanNameCase[] = casesHanName;

testcases.forEach(testcase => {
    describe(testcase.desc, () => {
        test(testcase.name, () => {
            const contextStub = new YakuContext(
                new PlayerHand([], []),
                new PlayerContext({agariHai: new Hai(TILE.BACK), isTsumo: false, playerWind: TILE.WIND.EAST, roundWind: TILE.WIND.EAST}),
                new BlockHaisList());
            const result = new ScoreResolver(contextStub, new Map()).hanName(testcase.han);
            expect(result).toEqual(testcase.expected);
        });
    });
});