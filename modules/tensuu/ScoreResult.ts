import { FuDetail } from "./FuDetail.js";
import { TensuuResult } from "./TensuuResult.js";

interface ScoreDetails {
    han: number,
    fuBasic: number,
    fuCeiled: number,
    tensuu: TensuuResult,
    hanName: string,
    fuDetail: FuDetail[]
}

export class ScoreResult{
    public readonly han: number;
    public readonly fuBasic: number;
    public readonly fuCeiled: number;
    public readonly tensuu: TensuuResult;
    public readonly hanName: string;
    public readonly fuDetail: FuDetail[];

    constructor(details: ScoreDetails)
    {
        this.han = details.han;
        this.fuBasic = details.fuBasic;
        this.fuCeiled = details.fuCeiled;
        this.tensuu = details.tensuu;
        this.hanName = details.hanName;
        this.fuDetail = details.fuDetail;
    }
}