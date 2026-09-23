import { Hai } from './Hai.js';
import { BlockDivider } from './BlockDivider.js';
import { PAI_TYPE_NUM } from './MahjongConsts.js';

export class MachiCalculator{
    private readonly hais: Hai[];

    constructor(hais: Hai[]){
        this.hais = hais.map(h => h.clone()).sort((a, b) => a.getId() - b.getId());
    }

    calcCandidate(hais: Hai[]): number[] {
        const candidate = new Set<number>();

        for (const hai of hais) {
            const id = hai.getId();
            candidate.add(id);

            if (hai.isNumberHai()) {
                const num = hai.num;

                if (num > 1) candidate.add(id - 1);
                if (num < 9) candidate.add(id + 1);
            }
        }
        return [...candidate].sort((a, b) => a - b);
    }

    genYaochuCandidate(): number[] {
        const candidate: number[] = [];

        for(let i = 1; i <= PAI_TYPE_NUM; i++){
            if(new Hai(i).isYaochuHai()) candidate.push(i);
        }

        return candidate;
    }

    calculate(): number[] {
        const machi: number[] = [];
        const haiNumsSet = [...new Set(this.hais.map(h => h.getId()))];
        const isAllYaochu = this.hais.every(h => h.isYaochuHai());
        // 19字牌を12種類以上持っていれば国士無双のテンパイの可能性
        const isKokushi = isAllYaochu && haiNumsSet.length >= 12;
        const candidate: number[] = isKokushi ? this.genYaochuCandidate() : this.calcCandidate(this.hais);

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