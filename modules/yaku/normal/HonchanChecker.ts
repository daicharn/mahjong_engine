import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';
import { IMentsu } from '../../IMentsu.js';
import { MentsuAnalyzer } from '../../MentsuAnalyzer.js';

export class HonchanChecker extends YakuCheckerBase{
    protected yakuName: string = "混全帯么九";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 2;
        this.hanFuro = 1;
    }
    
    protected isSatisfied(): boolean {
        const allMentsu: IMentsu[] = new MentsuAnalyzer(this.context.block.getBlockHais(), this.context.melds).getAll();
        const allYaochu = allMentsu.every(mentsu => (mentsu.hasRoutouHai() || mentsu.hasJihai()));
        const hasShuntsu = allMentsu.some(mentsu => mentsu.isShuntsu());
        const hasJihai = allMentsu.some(mentsu => mentsu.hasJihai());

        return allYaochu && hasShuntsu && hasJihai;
    }
}