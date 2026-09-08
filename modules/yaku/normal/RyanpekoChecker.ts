import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';

export class RyanpekoChecker extends YakuCheckerBase{
    protected yakuName: string = "二盃口";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 3;
    }

    protected isSatisfied(): boolean {
        if(!this.isMenzen()) return false;
        return this.countSameShuntsuGroups() === 2;
    }
}