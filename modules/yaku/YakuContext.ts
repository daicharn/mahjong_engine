import { Hai } from '../Hai.js';
import { Meld } from '../Meld.js';
import { PlayerHand } from '../PlayerHand.js';
import { PlayerContext } from '../PlayerContext.js';
import { BlockHaisList } from '../BlockHaisList.js';

export class YakuContext {
    readonly hand: PlayerHand;
    readonly block: BlockHaisList;
    readonly ctx: PlayerContext;

    constructor(hand: PlayerHand, ctx: PlayerContext, block: BlockHaisList){
        this.hand = hand;
        this.ctx = ctx;
        this.block = block;
    }

    get hais(): Hai[]{
        return this.hand.getTehai();
    }

    get melds(): Meld[]{
        return this.hand.getFuro();
    }
}