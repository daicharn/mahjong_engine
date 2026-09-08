import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';

export class MenzenTsumoChecker extends YakuCheckerBase{
    protected yakuName: string = "門前清自摸和";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 1;
    }

    protected isSatisfied(): boolean {
        return this.isMenzen() && this.context.ctx.isTsumo;
    }
}