import { Hai } from "../Hai.js";
import { ShantenCalculator } from "../ShantenCalculator.js";
import { UkeireCalculator } from "./UkeireCalculator.js";

export class DiscardEvaluator{
    private readonly hais: Hai[];

    constructor(hais: Hai[]){
        this.hais = hais.map(h => h.clone()).sort((a, b) => a.getId() - b.getId());
    }

    evaluate(){
        let bestHaiId = -1;
        let bestShanten = Infinity;
        let bestUkeireCount = -1;
        const uniqueHaiIds = [...new Set(this.hais.map(h => h.getId()))];
        for(const haiId of uniqueHaiIds){
            const discardIndex = this.hais.findIndex(h => h.getId() === haiId);
            const handAfterDiscard = this.hais.filter((_, index) => index !== discardIndex);
            const shanten = new ShantenCalculator(handAfterDiscard).calculate();
            const ukeire = new UkeireCalculator(handAfterDiscard, false).calculate();

            const ukeireCount = ukeire.reduce((sum, detail) => sum + detail.count, 0);

            if(shanten < bestShanten || (shanten === bestShanten && ukeireCount > bestUkeireCount)){
                bestHaiId = haiId;
                bestShanten = shanten;
                bestUkeireCount = ukeireCount;
            }
        }

        return [bestHaiId, bestShanten, bestUkeireCount];
    }
}