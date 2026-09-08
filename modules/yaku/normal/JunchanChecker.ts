import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';
import { IMentsu } from '../../IMentsu.js';
import { MentsuAnalyzer } from '../../MentsuAnalyzer.js';

export class JunchanChecker extends YakuCheckerBase{
    protected yakuName: string = "純全帯么九";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 3;
        this.hanFuro = 2;
    }

    protected isSatisfied(): boolean {
        const allMentsu: IMentsu[] = new MentsuAnalyzer(this.context.block.getBlockHais(), this.context.melds).getAll();
        return allMentsu.every(mentsu => mentsu.hasRoutouHai());
    }
}