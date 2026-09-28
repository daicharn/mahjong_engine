import { FuDetail } from "./FuDetail.js";
import { TensuuResult } from "./TensuuResult.js";

export class ScoreResult{
    public readonly han: number;
    public readonly fuBasic: number;
    public readonly fuCeiled: number;
    public readonly tensuu: TensuuResult;
    public readonly hanName: string;
    public readonly fuDetail: FuDetail[];

    constructor(
        han: number,
        fuBasic: number,
        fuCeiled: number,
        tensuu: TensuuResult,
        hanName: string,
        fuDetail: FuDetail[]
    ){
        this.han = han;
        this.fuBasic = fuBasic;
        this.fuCeiled = fuCeiled;
        this.tensuu = tensuu;
        this.hanName = hanName;
        this.fuDetail = fuDetail;
    }
}