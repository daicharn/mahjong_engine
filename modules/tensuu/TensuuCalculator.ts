import { TensuuResult } from './TensuuResult.js';

export class TensuuCalculator{
    static readonly BASE_LIMITS = [
        {han: 78, base: 48000, name: "六倍役満"},
        {han: 65, base: 40000, name: "五倍役満"},
        {han: 52, base: 32000, name: "四倍役満"},
        {han: 39, base: 24000, name: "三倍役満"},
        {han: 26, base: 16000, name: "二倍役満"},
        {han: 13, base: 8000, name: "役満"},
        {han: 11, base: 6000, name: "三倍満"},
        {han: 8,  base: 4000, name: "倍満"},
        {han: 6,  base: 3000, name: "跳満"},
        {han: 5,  base: 2000, name: "満貫"},
    ];

    static calcBaseTensuu(han: number, fu: number): number{
        return Math.min(fu * Math.pow(2, han + 2), 2000);
    }

    static calcRonTensuu(base: number, multi: number): number{
        return Math.ceil(base * multi / 100) * 100;
    }

    static calcdividedTensuu(ronTensuu: number, divide: number){
        return Math.ceil(Math.floor(ronTensuu / divide) / 100) * 100;
    }

    static calcTensuuFromBase(base: number): TensuuResult{
        const ronOya = this.calcRonTensuu(base, 6);
        const ronKo = this.calcRonTensuu(base, 4);
        const tsumoOya = this.calcdividedTensuu(ronOya, 3);
        const tsumoKo = {oya: this.calcdividedTensuu(ronKo, 2), ko: this.calcdividedTensuu(ronKo, 4)};

        return new TensuuResult(base, ronOya, ronKo, tsumoOya, tsumoKo);
    }

    static calcTensuu(han: number, fu: number): TensuuResult{
        for(const limit of this.BASE_LIMITS){
            if(han >= limit.han) return this.calcTensuuFromBase(limit.base);
        }
        return this.calcTensuuFromBase(this.calcBaseTensuu(han, fu));
    } 
}