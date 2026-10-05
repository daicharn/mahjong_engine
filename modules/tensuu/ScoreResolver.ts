import { YakuContext } from '../yaku/YakuContext.js';
import { TensuuCalculator } from './TensuuCalculator.js';
import { FuCalculator } from './FuCalculator.js';
import { FuDetail } from './FuDetail.js';
import { ScoreResult } from './ScoreResult.js';
import { YakuDetails } from '../yaku/YakuDetails.js';

export class ScoreResolver{
    private readonly context: YakuContext;
    private readonly yaku: YakuDetails;
    constructor(context: YakuContext, yaku: YakuDetails){
        this.context = context;
        this.yaku = yaku;
    }

    private countFusuu(detail: FuDetail[]): number{
        return detail.reduce((sum, val) => sum + val.fu, 0);
    }

    private ceilFusuu(fu: number): number{
        return fu === 25 ? 25 : Math.ceil(fu / 10) * 10;
    }

    private getHanName(han: number): string{
        for(const limit of TensuuCalculator.BASE_LIMITS){
            if(han >= limit.han) return limit.name;
        }

        return "";
    }

    hanName(han: number){
        return this.getHanName(han);
    }

    resolve(){
        const han = this.yaku.calcHonsuu();
        const fuDetail = new FuCalculator(this.context, this.yaku).calcFu();
        const fuBasic = this.countFusuu(fuDetail);
        const fuCeiled = this.ceilFusuu(fuBasic);
        const hanName = this.getHanName(han);
        const tensuu = TensuuCalculator.calcTensuu(han, fuCeiled);
        return new ScoreResult({
            han: han, 
            fuBasic: fuBasic,
            fuCeiled: fuCeiled,
            tensuu: tensuu,
            hanName: hanName,
            fuDetail: fuDetail
        });
    }
}