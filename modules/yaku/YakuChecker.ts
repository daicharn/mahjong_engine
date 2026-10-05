import { YakumanChecker } from './YakumanChecker.js';
import { YakuContext } from './YakuContext.js';
import { NormalYakuChecker } from './NormalYakuChecker.js';
import { YakuDetails } from './YakuDetails.js';

export class YakuChecker {
    private context: YakuContext

    constructor(context: YakuContext){
        this.context = context;
    }

    check(): YakuDetails {
        //手牌と鳴き（カンを考慮して鳴き一つを3と数える）が計14枚かどうか確認する
        const tehai_num = this.context.hais.length;
        const furo_num = this.context.melds.length;
        if(tehai_num + furo_num * 3 !== 14) return new YakuDetails();

        const yakumanDetails: YakuDetails = new YakumanChecker(this.context).check();
        if(yakumanDetails.length === 0){
            return new NormalYakuChecker(this.context).check();
        }
        else{
            return yakumanDetails;
        }
    }
}