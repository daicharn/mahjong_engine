import { Hai } from "../modules";
import { DiscardEvaluator } from "../modules/efficiency/DiscardEvaluator";

//const haiNum = [1,1,2,2,3,3,4,5,6,10,11,12,13,28];
//const haiNum = [4,5,5,5,6,6,6,7,7,8,8,8,8,9];
const haiNum = [2,3,3,3,4,5,5,5,6,6,7,7,8,9];
//const haiNum = [2,3,3,4,5,5,5,6,7,7,8,8,9,9];
//const haiNum = [1,9,10,18,19,27,28,28,28,29,29,29,30,30];
//const haiNum = [1,9,10,18,19,27,28,28,28,29,29,29,30,31];

test("test_1", () => {
    const hais = haiNum.map(id => new Hai(id));
    const start = performance.now();
    const evaluator = new DiscardEvaluator(hais, true).evaluate();
    const end = performance.now() - start;
    evaluator.map(ev => console.log(ev.haiId, ev.shanten, ev.ukeireCount)); 
    console.log(`${Math.floor(end * 100) / 100}ms`);
});