import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';
import { BlockHais } from '../../BlockHais.js';
import { MachiType } from '../../MahjongConsts.js';
import { MentsuAnalyzer } from '../../MentsuAnalyzer.js';

export class PinfuChecker extends YakuCheckerBase{
    protected yakuName: string = "平和";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 1;
    }

    protected isSatisfied(): boolean {
        const analyzer = new MentsuAnalyzer(this.context.block.getBlockHais(), this.context.melds);
        const pw = this.context.ctx.playerWind;
        const rw = this.context.ctx.roundWind;
        if(!this.isMenzen()) return false;
        if(analyzer.hasYakuhaiMentsu(m => m instanceof BlockHais && m.isJanto(), pw, rw)) return false;
        if(!analyzer.getAll().every(m => m.isShuntsu() || (m instanceof BlockHais && m.isJanto()))) return false;
        if(!this.context.block.calcMachiType(this.context.ctx.agariHai.getId()).has(MachiType.RYANMEN)) return false;
        
        return true;
    }
}