import { Hai } from './Hai.js';
import { Meld } from './Meld.js';
import { MeldType } from './MahjongConsts.js';

export class PlayerHand {
    private readonly tehai: Hai[];
    private readonly furo: Meld[];

    constructor(tehai: Hai[], furo: Meld[]){
        this.tehai = tehai;
        this.furo = furo;
    }

    getTehai(): Hai[] {
        return this.tehai;
    }

    getFuro(): Meld[] {
        return this.furo;
    }

    isMenzen(){
        return this.furo.every(meld => meld.getType() === MeldType.ANKAN);
    }

    getAllTiles(): Hai[] {
        const hais = this.tehai.map(h => h.clone());
        const meldHais = this.furo.flatMap(m => m.getHais().map(h => h.clone()));
        return [...hais, ...meldHais];
    }

}