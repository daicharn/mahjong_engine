export class DiscardEval{
    readonly haiId: number;
    readonly shanten: number;
    readonly ukeireCount: number;

    constructor(haiId: number, shanten: number, ukeireCount: number){
        this.haiId = haiId;
        this.shanten = shanten;
        this.ukeireCount = ukeireCount;
    }
}