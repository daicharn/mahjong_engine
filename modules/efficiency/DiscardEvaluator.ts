import { Hai } from "../Hai.js";
import { ShantenCalculator } from "../ShantenCalculator.js";
import { DiscardDetail } from "./DiscardDetail.js";
import { UkeireCalculator } from "./UkeireCalculator.js";

export class DiscardEvaluator{
    private readonly hais: Hai[];
    private readonly includeSpecial: boolean;

    constructor(hais: Hai[], includeSpecial: boolean){
        this.hais = hais.map(h => h.clone()).sort((a, b) => a.getId() - b.getId());
        this.includeSpecial = includeSpecial;
    }

    evaluate(): DiscardDetail[]{
        let bestShanten = Infinity;
        const DiscardDetails: DiscardDetail[] = [];
        const uniqueHaiIds = [...new Set(this.hais.map(h => h.getId()))];
        for(const haiId of uniqueHaiIds){
            const discardIndex = this.hais.findIndex(h => h.getId() === haiId);
            const handAfterDiscard = this.hais.filter((_, index) => index !== discardIndex);
            const shanten = new ShantenCalculator(handAfterDiscard).calculate();
            const ukeire = new UkeireCalculator(handAfterDiscard, this.includeSpecial).calculate();

            const ukeireCount = ukeire.reduce((sum, detail) => sum + detail.count, 0);

            if(shanten < bestShanten){
                bestShanten = shanten;
            }

            DiscardDetails.push(new DiscardDetail(haiId, shanten, ukeireCount));
        }

        return DiscardDetails
            .filter(ev => ev.shanten === bestShanten)
            .sort((a, b) => b.ukeireCount - a.ukeireCount);
    }
}