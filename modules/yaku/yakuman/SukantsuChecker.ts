import { YakuCheckerBase } from '../YakuCheckerBase.js';

export class SukantsuChecker extends YakuCheckerBase{
    protected yakuName: string = "四槓子";

    protected isSatisfied(): boolean {
        return this.countKantsu() === 4;
    }
}