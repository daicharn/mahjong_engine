import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';

export class IipekoChecker extends YakuCheckerBase{
    protected yakuName: string = "一盃口";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 1;
    }

    protected isSatisfied(): boolean {
        if(!this.isMenzen()) return false;
        return this.countSameShuntsuGroups() === 1;
    }
}