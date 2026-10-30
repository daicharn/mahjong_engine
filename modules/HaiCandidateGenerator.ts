import { Hai } from "./Hai.js";
import { PAI_TYPE_NUM } from "./MahjongConsts.js";
import { ShantenCalculator } from "./ShantenCalculator.js";

export class HaiCandidateGenerator {
    private readonly hais: Hai[];
    private readonly distance: 1 | 2;
    private readonly includeSpecial: boolean;

    constructor(hais: Hai[], distance: 1 | 2, includeSpecial: boolean){
        this.hais = hais.map(h => h.clone()).sort((a, b) => a.getId() - b.getId());
        this.distance = distance;
        this.includeSpecial = includeSpecial;
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
        if(!this.includeSpecial) return this.calcCandidate(this.hais);
        
        const shantenNormal = new ShantenCalculator(this.hais).calculateNormal();
        const shantenKokushi = new ShantenCalculator(this.hais).calculateKokushi();
        const isKokushi = shantenNormal > shantenKokushi;
        const candidate: number[] = isKokushi ? this.genYaochuCandidate() : this.calcCandidate(this.hais);

        return candidate;
    }
}