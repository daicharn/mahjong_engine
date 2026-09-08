import { YakuCheckerBase } from '../YakuCheckerBase.js';
import { BlockType } from '../../MahjongConsts.js';

export class KokushiChecker extends YakuCheckerBase{
    protected yakuName: string = "国士無双";

    protected isSatisfied(): boolean {
        if(!this.isMenzen()) return false;
        return this.context.block.getBlockHais().some(b => b.getType() === BlockType.KOKUSHI);
    }

    public isKokushi(): boolean {
        return this.isSatisfied();
    }
}