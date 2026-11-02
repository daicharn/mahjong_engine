import { Hai } from "../Hai.js";
import { ShantenCalculator } from "../ShantenCalculator.js";
import { DiscardDetail } from "./DiscardDetail.js";
import { UkeireCalculator } from "./UkeireCalculator.js";

export class DiscardEvaluator{
    private readonly hais: Hai[];
    private readonly includeSpecial: boolean;

    constructor(hais: Hai[], includeSpecial: boolean){
        this.hais = hais;
        this.includeSpecial = includeSpecial;
    }

    private calcShanten(hais: Hai[]): number {
        const calculator = new ShantenCalculator(hais);

        return this.includeSpecial
            ? calculator.calculate()
            : calculator.calculateNormal();
    }

    evaluate(): DiscardDetail[]{
        let bestShanten = Infinity;

        const candidates: {
            haiId: number;
            hand: Hai[];
            shanten: number;
        }[] = [];

        const uniqueHaiIds = [...new Set(this.hais.map(h => h.getId()))];
        for(const haiId of uniqueHaiIds){
            const discardIndex = this.hais.findIndex(h => h.getId() === haiId);
            const hand = this.hais.filter((_, index) => index !== discardIndex);
            const shanten = this.calcShanten(hand);

            bestShanten = Math.min(bestShanten, shanten);

            candidates.push({haiId, hand, shanten});
        }

        return candidates
            .filter(c => c.shanten === bestShanten)
            .map(c => {
                const ukeire = new UkeireCalculator(
                    c.hand,
                    this.includeSpecial,
                    c.shanten
                ).calculate();
                
                const ukeireCount = ukeire.reduce((sum, detail) => sum + detail.count, 0);

                return new DiscardDetail(c.haiId, c.shanten, ukeireCount, ukeire);
            })
            .sort((a, b) => b.ukeireCount - a.ukeireCount);

    }
}