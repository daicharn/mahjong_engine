import { UkeireDetail } from "./UkeireDetail.js";

export class DiscardDetail{
    readonly haiId: number;
    readonly shanten: number;
    readonly ukeireCount: number;
    readonly ukeireDetails: UkeireDetail[];

    constructor(haiId: number, shanten: number, ukeireCount: number, ukeireDetails: UkeireDetail[]){
        this.haiId = haiId;
        this.shanten = shanten;
        this.ukeireCount = ukeireCount;
        this.ukeireDetails = ukeireDetails;
    }
}