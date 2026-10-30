import { Hai } from "../Hai.js";
import { HaiCandidateGenerator } from "../HaiCandidateGenerator.js";
import { PAI_TYPE_NUM } from "../MahjongConsts.js";
import { ShantenCalculator } from "../ShantenCalculator.js";
import { UkeireDetail } from "./UkeireDetail.js";

export class UkeireCalculator {
    private readonly hais: Hai[];
    private readonly includeSpecial: boolean;

    constructor(hais: Hai[], includeSpecial: boolean){
        this.hais = hais.map(h => h.clone()).sort((a, b) => a.getId() - b.getId());
        this.includeSpecial = includeSpecial;
    }

    private calcShanten(hais: Hai[]): number {
        const calculator = new ShantenCalculator(hais);

        return this.includeSpecial
            ? calculator.calculate()
            : calculator.calculateNormal();
    }

    calculate(): UkeireDetail[]{
        const counts: number[] = new Array(PAI_TYPE_NUM).fill(0);
        this.hais.forEach(h => counts[h.getId() - 1]++);
        const currentShanten = this.calcShanten(this.hais);
        const tiles = new HaiCandidateGenerator(this.hais, 2, this.includeSpecial).calculate()
        const details: UkeireDetail[] = [];
        for(const tile of tiles){
            const remaining = 4 - counts[tile - 1];
            if(remaining === 0) continue;

            const nextHais: Hai[] = [...this.hais, new Hai(tile)];
            const nextShanten: number = this.calcShanten(nextHais);

            if(nextShanten < currentShanten){
                details.push(new UkeireDetail(tile, remaining));
            }
        }

        return details;
    }
}