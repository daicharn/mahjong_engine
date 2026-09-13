import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from "../YakuCheckerBase.js";

export class RiichiChecker extends YakuCheckerBase{
    protected yakuName: string = "立直";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 1;
    }

    protected isSatisfied(): boolean {
        if(!this.isMenzen()) return false;
        return this.context.ctx.riichi;
    }
}