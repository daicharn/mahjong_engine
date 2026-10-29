import { Hai } from "../Hai";
import { HaiCandidateGenerator } from "../HaiCandidateGenerator";
import { PAI_TYPE_NUM } from "../MahjongConsts";
import { ShantenCalculator } from "../ShantenCalculator";
import { UkeireDetail } from "./UkeireDetail";

export class UkeireCalculator {
    private readonly hais: Hai[];
    private readonly noSpecial: boolean;

    constructor(hais: Hai[], noSpecial: boolean){
        this.hais = hais.map(h => h.clone()).sort((a, b) => a.getId() - b.getId());
        this.noSpecial = noSpecial;
    }

    private calcShanten(hais: Hai[]): number {
        const calculator = new ShantenCalculator(hais);

        return this.noSpecial
            ? calculator.calculateNormal()
            : calculator.calculate();
    }

    calculate(): UkeireDetail[]{
        const counts: number[] = new Array(PAI_TYPE_NUM).fill(0);
        this.hais.forEach(h => counts[h.getId() - 1]++);
        const currentShanten = this.calcShanten(this.hais);
        const tiles = this.noSpecial
            ? new HaiCandidateGenerator(this.hais, 2).calculate()
            : HaiCandidateGenerator.generateAll();
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