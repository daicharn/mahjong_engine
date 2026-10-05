import { WinEvent } from '../MahjongConsts.js';
import { YakuContext } from './YakuContext.js';
import { YakuDetails } from './YakuDetails.js';
import { NormalYakuCheckers } from './index.js';

export class NormalYakuChecker{
    protected readonly context: YakuContext;

    constructor(context: YakuContext){
        this.context = context;
    }

    //役判定
    check(): YakuDetails {
        const yakuDetails: YakuDetails = new YakuDetails();
        for(const Checker of NormalYakuCheckers) {
            const checker = Checker(this.context);
            if(checker.check()) yakuDetails.add(checker.getName(), checker.getHan());
        }
        
        if(this.context.ctx.event === WinEvent.RINSHAN) yakuDetails.add("嶺上開花", 1);
        if(this.context.ctx.event === WinEvent.CHANKAN) yakuDetails.add("槍槓", 1);
        if(this.context.ctx.event === WinEvent.HAITEI) yakuDetails.add("海底摸月", 1);
        if(this.context.ctx.event === WinEvent.HOUTEI) yakuDetails.add("河底撈魚", 1);

        if(yakuDetails.length > 0 && this.context.ctx.dora > 0){
            yakuDetails.add("ドラ", this.context.ctx.dora);
        }
        
        return yakuDetails;
    }
}