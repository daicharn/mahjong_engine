import { Hais } from "../modules/Hais";
import { BlockHaisList } from "../modules/BlockHaisList";
import { BlockDivider } from '../modules/BlockDivider';
import { BlockType, MachiType } from "../modules/MahjongConsts";
import { BlockHais } from "../modules";

function getBlockHaisList(haisNum: number[]): BlockHaisList[]{
    return new BlockDivider(new Hais(haisNum).getHais()).divide();
}
function getMachiType(haisNum: number[], haiId: number){
    const results = getBlockHaisList(haisNum);
    let resultMachiType: Map<MachiType, BlockHais> = new Map<MachiType, BlockHais>();
    if(results.length === 1) resultMachiType = results[0].calcMachiType(haiId);
    return resultMachiType;
}

test("tanki_1", () => {
    const resultMachiType = getMachiType([1,2,3,4,5,6,7,8,9,10,10,10,12,12], 12);

    const block = BlockHais.from(12, BlockType.JANTO);
    const expected = new Map<MachiType, BlockHais>([[MachiType.TANKI, block]]);
    expect(resultMachiType).toEqual(expected);
});
test("shanpon_1", () => {
    const resultMachiType = getMachiType([1,2,3,4,5,6,7,8,9,10,10,10,12,12], 10);

    const block = BlockHais.from(10, BlockType.KOTSU);
    const expected = new Map<MachiType, BlockHais>([[MachiType.SHANPON, block]]);
    expect(resultMachiType).toEqual(expected);
});
test("ryanmen_1", () => {
    const resultMachiType = getMachiType([1,2,3,4,5,6,7,8,9,10,10,10,12,12], 1);

    const block = BlockHais.from(1, BlockType.SHUNTSU);
    const expected = new Map<MachiType, BlockHais>([[MachiType.RYANMEN, block]]);
    expect(resultMachiType).toEqual(expected);
});
test("ryanmen_2", () => {
    const resultMachiType = getMachiType([1,2,3,4,5,6,7,8,9,10,10,10,12,12], 4);

    const block = BlockHais.from(4, BlockType.SHUNTSU);
    const expected = new Map<MachiType, BlockHais>([[MachiType.RYANMEN, block]]);
    expect(resultMachiType).toEqual(expected);
});
test("ryanmen_3", () => {
    const resultMachiType = getMachiType([1,2,3,4,5,6,7,8,9,10,10,10,12,12], 6);

    const block = BlockHais.from(4, BlockType.SHUNTSU);
    const expected = new Map<MachiType, BlockHais>([[MachiType.RYANMEN, block]]);
    expect(resultMachiType).toEqual(expected);
});
test("penchan_1", () => {
    const resultMachiType = getMachiType([1,2,3,4,5,6,7,8,9,10,10,10,12,12], 3);

    const block = BlockHais.from(1, BlockType.SHUNTSU);
    const expected = new Map<MachiType, BlockHais>([[MachiType.PENCHAN, block]]);
    expect(resultMachiType).toEqual(expected);
});
test("penchan_2", () => {
    const resultMachiType = getMachiType([1,2,3,4,5,6,7,8,9,10,10,10,12,12], 7);

    const block = BlockHais.from(7, BlockType.SHUNTSU);
    const expected = new Map<MachiType, BlockHais>([[MachiType.PENCHAN, block]]);
    expect(resultMachiType).toEqual(expected);
});
test("kanchan_1", () => {
    const resultMachiType = getMachiType([1,2,3,4,5,6,7,8,9,10,10,10,12,12], 5);

    const block = BlockHais.from(4, BlockType.SHUNTSU);
    const expected = new Map<MachiType, BlockHais>([[MachiType.KANCHAN, block]]);
    expect(resultMachiType).toEqual(expected);
});
test("complex_1", () => {
    const resultMachiType = getMachiType([1,2,2,2,3,4,5,6,7,8,9,10,10,10], 2);

    const block1 = BlockHais.from(1, BlockType.SHUNTSU);
    const block2 = BlockHais.from(2, BlockType.JANTO);
    const expected = new Map<MachiType, BlockHais>([[MachiType.KANCHAN, block1], [MachiType.TANKI, block2]]);
    expect(resultMachiType).toEqual(expected);
});
test("complex_2", () => {
    const resultMachiType = getMachiType([1,2,2,2,2,3,4,5,6,7,8,9,10,10], 2);

    const block1 = BlockHais.from(2, BlockType.KOTSU);
    const block2 = BlockHais.from(1, BlockType.SHUNTSU);
    const expected = new Map<MachiType, BlockHais>([[MachiType.SHANPON, block1], [MachiType.KANCHAN, block2]]);
    expect(resultMachiType).toEqual(expected);
});
test("complex_3", () => {
    const resultMachiType = getMachiType([1,1,1,2,3,4,5,6,7,8,9,11,11,11], 1);

    const block1 = BlockHais.from(1, BlockType.SHUNTSU);
    const block2 = BlockHais.from(1, BlockType.JANTO);
    const expected = new Map<MachiType, BlockHais>([[MachiType.RYANMEN, block1], [MachiType.TANKI, block2]]);
    expect(resultMachiType).toEqual(expected);
});
test("multi_1", () => {
    const resultMachiType = getMachiType([1,1,2,2,3,3,5,5,5,6,6,6,7,7], 2);

    const block = BlockHais.from(1, BlockType.SHUNTSU);
    const expected = new Map<MachiType, BlockHais>([[MachiType.KANCHAN, block]]);
    expect(resultMachiType).toEqual(expected);
});
test("multi_2", () => {
    const resultMachiType = getMachiType([1,1,2,3,4,4,5,6,7,8,9,11,11,11], 4);

    const block1 = BlockHais.from(2, BlockType.SHUNTSU);
    const block2 = BlockHais.from(4, BlockType.SHUNTSU);
    const expected = new Map<MachiType, BlockHais>([[MachiType.RYANMEN, block1], [MachiType.RYANMEN, block2]]);
    expect(resultMachiType).toEqual(expected);
});