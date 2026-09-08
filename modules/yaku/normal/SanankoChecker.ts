import { YakuContext } from '../YakuContext.js';
import { YakuCheckerBase } from '../YakuCheckerBase.js';

export class SanankoChecker extends YakuCheckerBase{
    protected yakuName: string = "三暗刻";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 2;
        this.hanFuro = 2;
    }

    protected isSatisfied(): boolean {
        return this.countAnko() === 3;
    }
}