import { ExtendedYakumanChecker } from './ExtendedYakumanChecker.js';
import { YakuContext } from '../YakuContext.js';
import { KokushiChecker } from './KokushiChecker.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';

export class Kokushi13Checker extends ExtendedYakumanChecker{
    protected yakuName: string = "国士無双13面待ち";
    protected baseChecker: YakuCheckerBase;
    protected requiredMachiCount: number;

    constructor(context: YakuContext){
        super(context);
        this.baseChecker = new KokushiChecker(context);
        this.requiredMachiCount = 13;
    }
}