import { Hai } from "./Hai";
import { PAI_TYPE_NUM } from "./MahjongConsts";

export class HaiCandidateGenerator {
    private readonly hais: Hai[];
    private readonly distance: 1 | 2;

    constructor(hais: Hai[], distance: 1 | 2){
        this.hais = hais.map(h => h.clone()).sort((a, b) => a.getId() - b.getId());
        this.distance = distance;
    }

    static generateAll(){
        return Array.from({length: PAI_TYPE_NUM}, (_, i) => i + 1);
    }

    private calcCandidate(hais: Hai[]): number[] {
        const candidate = new Set<number>();

        for (const hai of hais) {
            const id = hai.getId();
            candidate.add(id);

            if (hai.isNumberHai()) {
                const num = hai.num;

                if (num > 1) candidate.add(id - 1);
                if (this.distance === 2 && num > 2) candidate.add(id - 2);
                if (num < 9) candidate.add(id + 1);
                if (this.distance === 2 && num < 8) candidate.add(id + 2);
            }
        }
        return [...candidate].sort((a, b) => a - b);
    }
    
    private genYaochuCandidate(): number[] {
        const candidate: number[] = [];

        for(let i = 1; i <= PAI_TYPE_NUM; i++){
            if(new Hai(i).isYaochuHai()) candidate.push(i);
        }

        return candidate;
    }

    calculate(): number[] {
        const haiNumsSet = [...new Set(this.hais.map(h => h.getId()))];
        const isAllYaochu = this.hais.every(h => h.isYaochuHai());
        // 19字牌を12種類以上持っていれば国士無双のテンパイの可能性
        const isKokushi = isAllYaochu && haiNumsSet.length >= 12;
        const candidate: number[] = isKokushi ? this.genYaochuCandidate() : this.calcCandidate(this.hais);

        return candidate;
    }
}