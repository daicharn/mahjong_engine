import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';

export class IppatsuChecker extends YakuCheckerBase{
    protected yakuName: string = "一発";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 1;
    }

    protected isSatisfied(): boolean {
        return this.isMenzen() && this.context.ctx.ippatsu;
    }
}