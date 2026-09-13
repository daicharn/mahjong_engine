import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from "../YakuCheckerBase.js";

export class DaburiiChecker extends YakuCheckerBase{
    protected yakuName: string = "ダブル立直";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 2;
    }

    protected isSatisfied(): boolean {
        if(!this.isMenzen()) return false;
        return this.context.ctx.daburii;
    }
}