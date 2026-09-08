import { ExtendedYakumanChecker } from './ExtendedYakumanChecker.js';
import { YakuContext } from '../YakuContext.js';
import { ChurenChecker } from './ChurenChecker.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';

export class Churen9Checker extends ExtendedYakumanChecker{
    protected yakuName: string = "純正九蓮宝燈";
    protected baseChecker: YakuCheckerBase;
    protected requiredMachiCount: number;

    constructor(context: YakuContext){
        super(context);
        this.baseChecker = new ChurenChecker(context);
        this.requiredMachiCount = 9;
    }
}