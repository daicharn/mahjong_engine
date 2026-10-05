export class YakuDetail{
    readonly yakuName: string;
    readonly han: number;
    readonly isYakuman: boolean;

    constructor(yakuName: string, han: number, isYakuman?: boolean){
        this.yakuName = yakuName;
        this.han = han;
        this.isYakuman = isYakuman ?? false;
    }
}