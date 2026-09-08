import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';
import { MentsuAnalyzer } from '../../MentsuAnalyzer.js';

export class RenpuuhaiChecker extends YakuCheckerBase{
    protected yakuName: string;

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 2;
        this.hanFuro = 2;
        this.yakuName = `連風牌:${this.context.ctx.playerWind.name}`;
    }

    protected isSatisfied(): boolean {
        const analyzer = new MentsuAnalyzer(this.context.block.getBlockHais(), this.context.melds);
        const pw = this.context.ctx.playerWind;
        const rw = this.context.ctx.roundWind;
        return analyzer.hasDoubleWindMentsu(m => m.isKotsuOrKantsu(), pw, rw);
    }
}