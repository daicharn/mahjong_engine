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
        const discardDetails: DiscardDetail[] = [];
        const uniqueHaiIds = [...new Set(this.hais.map(h => h.getId()))];
        for(const haiId of uniqueHaiIds){
            const discardIndex = this.hais.findIndex(h => h.getId() === haiId);
            const handAfterDiscard = this.hais.filter((_, index) => index !== discardIndex);
            const shanten = this.calcShanten(handAfterDiscard);
            const ukeire = new UkeireCalculator(handAfterDiscard, this.includeSpecial).calculate();

            const ukeireCount = ukeire.reduce((sum, detail) => sum + detail.count, 0);

            if(shanten < bestShanten){
                bestShanten = shanten;
            }

            discardDetails.push(new DiscardDetail(haiId, shanten, ukeireCount, ukeire));
        }

        return discardDetails
            .filter(ev => ev.shanten === bestShanten)
            .sort((a, b) => b.ukeireCount - a.ukeireCount);
    }
}