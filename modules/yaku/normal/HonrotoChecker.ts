import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';
import { IMentsu } from '../../IMentsu.js';
import { MentsuAnalyzer } from '../../MentsuAnalyzer.js';

export class HonrotoChecker extends YakuCheckerBase{
    protected yakuName: string = "混老頭";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 2;
        this.hanFuro = 2;
    }

    protected isSatisfied(): boolean {
        const allMentsu: IMentsu[] = new MentsuAnalyzer(this.context.block.getBlockHais(), this.context.melds).getAll();
        const allYaochu = allMentsu.every(mentsu => (mentsu.hasRoutouHai() || mentsu.hasJihai()));
        const allNotShuntsu = allMentsu.every(mentsu => !mentsu.isShuntsu());

        return allYaochu && allNotShuntsu;
    }
}