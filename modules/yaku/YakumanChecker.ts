import { WinEvent } from '../MahjongConsts.js';
import { YakuContext } from './YakuContext.js';
import { YakuDetail } from './YakuDetail.js';
import { YakuDetails } from './YakuDetails.js';
import { YakumanCheckers } from './index.js';

export class YakumanChecker{
    protected readonly context: YakuContext;

    constructor(context: YakuContext){
        this.context = context;
    }

    //役判定
    check(): YakuDetails {
        const excludes = [
            { main: "純正九蓮宝燈", sub: "九蓮宝燈"},
            { main: "四暗刻単騎", sub: "四暗刻"},
            { main: "国士無双13面待ち", sub: "国士無双"},
        ];
        const yakuDetails: YakuDetails = new YakuDetails();
        if(this.context.ctx.event === WinEvent.TENHO) yakuDetails.add("天和", 13, true);
        if(this.context.ctx.event === WinEvent.CHIHO) yakuDetails.add("地和", 13, true);

        for(const Checker of YakumanCheckers) {
            const checker = Checker(this.context);
            if(checker.check()) yakuDetails.add(checker.getName(), checker.getHan(), true);
        }

        for(const { main, sub } of excludes) {
            if(yakuDetails.has(main)) yakuDetails.delete(sub);
        }

        return yakuDetails;
    }
}