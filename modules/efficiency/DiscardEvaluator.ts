import { Hai } from "../Hai.js";
import { ShantenCalculator } from "../ShantenCalculator.js";
import { DiscardEval } from "./DiscardEval.js";
import { UkeireCalculator } from "./UkeireCalculator.js";

export class DiscardEvaluator{
    private readonly hais: Hai[];

    constructor(hais: Hai[]){
        this.hais = hais.map(h => h.clone()).sort((a, b) => a.getId() - b.getId());
    }

    evaluate(): DiscardEval[]{
        let bestShanten = Infinity;
        const discardEvals: DiscardEval[] = [];
        const uniqueHaiIds = [...new Set(this.hais.map(h => h.getId()))];
        for(const haiId of uniqueHaiIds){
            const discardIndex = this.hais.findIndex(h => h.getId() === haiId);
            const handAfterDiscard = this.hais.filter((_, index) => index !== discardIndex);
            const shanten = new ShantenCalculator(handAfterDiscard).calculate();
            const ukeire = new UkeireCalculator(handAfterDiscard, true).calculate();

            const ukeireCount = ukeire.reduce((sum, detail) => sum + detail.count, 0);

            if(shanten < bestShanten){
                bestShanten = shanten;
            }

            discardEvals.push(new DiscardEval(haiId, shanten, ukeireCount));
        }

        return discardEvals
            .filter(ev => ev.shanten === bestShanten)
            .sort((a, b) => b.ukeireCount - a.ukeireCount);
    }
}