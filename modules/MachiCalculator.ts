import { Hai } from './Hai.js';
import { BlockDivider } from './BlockDivider.js';
import { PAI_TYPE_NUM } from './MahjongConsts.js';
import { HaiCandidateGenerator } from './HaiCandidateGenerator.js';

export class MachiCalculator{
    private readonly hais: Hai[];

    constructor(hais: Hai[]){
        this.hais = hais.map(h => h.clone()).sort((a, b) => a.getId() - b.getId());
    }

    calculate(): number[] {
        const machi: number[] = [];
        const candidate: number[] = new HaiCandidateGenerator(this.hais, 1, true).calculate();

        for(const haiId of candidate){
            const testhais = [...this.hais, new Hai(haiId)];
            const divided = new BlockDivider(testhais).divide();
            if(divided.length > 0){
                machi.push(haiId);
            }
        }

        return machi;
    }
}