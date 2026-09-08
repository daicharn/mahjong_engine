import { IMentsu } from "../IMentsu.js";

export class FuDetail{
    readonly name: string;
    readonly fu: number;
    readonly mentsu?: IMentsu;

    constructor(name: string, fu: number, mentsu?: IMentsu){
        this.name = name;
        this.fu = fu;
        this.mentsu = mentsu;
    }
}