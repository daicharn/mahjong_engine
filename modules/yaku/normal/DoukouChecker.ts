import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';

export class DoukouChecker extends YakuCheckerBase{
    protected yakuName: string = "三色同刻";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 2;
        this.hanFuro = 2;
    }

    protected isSatisfied(): boolean {
        return this.checkSanshoku((m) => m.isKotsuOrKantsu());
    }
}