import { YakuCheckerBase } from '../YakuCheckerBase.js';
import { YakuContext } from '../YakuContext.js';

export abstract class ExtendedYakumanChecker extends YakuCheckerBase{
    protected abstract baseChecker: YakuCheckerBase;
    protected abstract requiredMachiCount: number;

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 26;
        this.hanFuro = 26;
    }

    public isSatisfied(): boolean {
        if(!this.baseChecker.check()) return false;
        return this.calculateMachiCount() === this.requiredMachiCount;
    }
}