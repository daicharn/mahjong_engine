import { IMentsu } from "../IMentsu.js";
import { MachiType } from "../MahjongConsts.js";

export class FuDetail{
    readonly name: string;
    readonly fu: number;
    readonly mentsu?: IMentsu;
    readonly machiType?: MachiType;

    constructor(name: string, fu: number, mentsu?: IMentsu, machiType?: MachiType){
        this.name = name;
        this.fu = fu;
        this.mentsu = mentsu;
        this.machiType = machiType;
    }
}