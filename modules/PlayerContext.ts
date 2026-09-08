import { Hai } from "./Hai.js";
import { WinEvent } from "./MahjongConsts.js";
import { Wind } from "./tileDefs.js";

interface UserOptions {
    agariHai: Hai
    isTsumo: boolean;
    playerWind: Wind;
    roundWind: Wind;
    event?: WinEvent;
    riichi?: boolean;
    daburii?: boolean;
    ippatsu?: boolean;
    kuitan?: boolean;
}

export class PlayerContext{
    agariHai: Hai;
    isTsumo: boolean;
    playerWind: Wind;
    roundWind: Wind;
    event: WinEvent;
    riichi: boolean;
    daburii: boolean;
    ippatsu: boolean;
    kuitan: boolean;

    constructor(options: UserOptions) {
        this.agariHai = options.agariHai;
        this.isTsumo = options.isTsumo;
        this.playerWind = options.playerWind;
        this.roundWind = options.roundWind;
        this.event = options.event ?? WinEvent.NONE;
        this.riichi =  options.riichi ?? false;
        this.daburii =  options.daburii ?? false;
        this.ippatsu =  options.ippatsu ?? false;
        this.kuitan =  options.kuitan ?? false;
    }
}