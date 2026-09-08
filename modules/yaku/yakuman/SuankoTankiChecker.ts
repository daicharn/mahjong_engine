import { YakuCheckerBase } from '../YakuCheckerBase.js';
import { BlockType } from '../../MahjongConsts.js';
import { SuankoChecker } from './SuankoChecker.js';
import { YakuContext } from '../YakuContext.js';

export class SuankoTankiChecker extends YakuCheckerBase{
    protected yakuName: string = "四暗刻単騎";

    constructor(context: YakuContext){
        super(context);
        this.hanMenzen = 26;
        this.hanFuro = 26;
    }

    protected isSatisfied(): boolean {
        const base = new SuankoChecker(this.context)
        if(!base.isSuanko()) return false;

        for(const blockhais of this.context.block){
            if(blockhais.getType() === BlockType.JANTO){
                if(blockhais.getHais().some(h => h.getId() == this.context.ctx.agariHai.getId())) return true;
            }
        }

        return false;
    }
}