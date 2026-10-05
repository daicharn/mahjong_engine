import { YakuDetail } from "./YakuDetail";

export class YakuDetails{
    private details: YakuDetail[];

    constructor(details: YakuDetail[] = []) {
        this.details = details;
    }

    add(yakuName: string, han: number, isYakuman?: boolean){
        this.details.push(new YakuDetail(yakuName, han, isYakuman ?? false));
    }

    has(yakuName: string){
        return this.details.some(detail => detail.yakuName === yakuName);
    }

    delete(yakuName: string){
        this.details = this.details.filter(detail => detail.yakuName !== yakuName);
    }

    calcHonsuu(){
        return this.details.reduce((sum, val) => sum + val.han, 0);
    }

    isIncludeYakuman(){
        return this.details.some(detail => detail.isYakuman);
    }

    toMap(){
        return new Map(
            this.details.map(detail => [
                detail.yakuName,
                detail.han
            ])
        );
    }

    get length(){
        return this.details.length;
    }
}