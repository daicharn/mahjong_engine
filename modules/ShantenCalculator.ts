import { BlockDivider } from "./BlockDivider.js";
import { Hai } from "./Hai.js";
import { MachiCalculator } from "./MachiCalculator.js";
import { PAI_TYPE_NUM } from "./MahjongConsts.js";

export class ShantenCalculator {
    private readonly hais: Hai[];
    private readonly counts: number[];

    constructor(hais: Hai[]){
        this.hais = hais.map(h => h.clone()).sort((a, b) => a.getId() - b.getId());
        this.counts = new Array(PAI_TYPE_NUM).fill(0);
        this.hais.forEach(h => this.counts[h.getId() - 1]++);
    }

    calculate(): number {
        const normal = this.calculateNormal();
        const chitoi = this.calculateChitoitsu();
        const kokushi = this.calculateKokushi();

        return Math.min(normal, chitoi, kokushi);
    }

    private calculateShanten(
        requiredMentsuCount: number,
        mentsuCount: number,
        taatsuCount: number,
        toitsuCount: number,
    ): number {
        const usableTaatsu = Math.min(taatsuCount, Math.max(0, requiredMentsuCount - mentsuCount));
        const usableJanto = Math.min(toitsuCount, 1);
        return 8 - 2 * (4 - requiredMentsuCount + mentsuCount) - usableTaatsu - usableJanto;
    }

    private isTenpai(): boolean {
        return new MachiCalculator(this.hais).calculate().length > 0;
    }

    private isAgari(): boolean {
        return new BlockDivider(this.hais).divide().length > 0;
    }

    private calculateNormal(): number {
        if(this.isAgari()) return -1;
        if(this.isTenpai()) return 0;

        let minShanten = 8;
        const requiredMentsuCount = Math.floor(this.hais.length / 3);
        const dfs = (
            arr: number[],
            mentsuCount: number,
            taatsuCount: number,
            toitsuCount: number,
        ) => {
            const firstIndex = arr.findIndex(count => count > 0);
            if(firstIndex === -1) {
                const shanten = this.calculateShanten(
                    requiredMentsuCount,
                    mentsuCount,
                    taatsuCount,
                    toitsuCount
                );
                minShanten = Math.min(minShanten, shanten);
                return;
            }

            const count = arr[firstIndex];
            const hai = new Hai(firstIndex + 1);

            //雀頭
            if(count >= 2){
                let next = [...arr];
                next[firstIndex] -= 2;
                dfs(next, mentsuCount, taatsuCount, toitsuCount + 1);
            }
            //刻子
            if(count >= 3){
                let next = [...arr];
                next[firstIndex] -= 3;
                dfs(next, mentsuCount + 1, taatsuCount, toitsuCount);
            }
            //順子
            const hasShuntsuTiles =
                arr[firstIndex + 1] > 0 &&
                arr[firstIndex + 2] > 0;
            const isShuntsuCandidate = hai.isNumberHai() && hai.num <= 7;
            if(isShuntsuCandidate && hasShuntsuTiles){
                let next = [...arr];
                next[firstIndex]--;
                next[firstIndex + 1]--;
                next[firstIndex + 2]--;
                dfs(next, mentsuCount + 1, taatsuCount, toitsuCount);
            }
            //両面、辺張ターツ
            const hasRyanmenTiles = arr[firstIndex + 1] > 0;
            const isRyanmenCandidate = hai.isNumberHai() && hai.num <= 8;
            if(isRyanmenCandidate && hasRyanmenTiles){
                let next = [...arr];
                next[firstIndex]--;
                next[firstIndex + 1]--;

                dfs(next, mentsuCount, taatsuCount + 1, toitsuCount);
            }
            //嵌張ターツ
            const hasKanchanTiles = arr[firstIndex + 2] > 0;
            const isKanchanCandidate = hai.isNumberHai() && hai.num <= 7;
            if(isKanchanCandidate && hasKanchanTiles){
                let next = [...arr];
                next[firstIndex]--;
                next[firstIndex + 2]--;
                dfs(next, mentsuCount, taatsuCount + 1, toitsuCount);
            }

            //孤立牌
            const next = [...arr];
            next[firstIndex]--;
            dfs(next, mentsuCount, taatsuCount, toitsuCount);
        }

        dfs(this.counts, 0, 0, 0);

        return minShanten;
    }
    
    private calculateChitoitsu(): number {
        const haiNumsSet = [...new Set(this.hais.map(h => h.getId()))];
        const toitsuCount = haiNumsSet.filter(n => this.counts[n - 1] === 2).length;
        return 6 - toitsuCount;
    }

    private calculateKokushi(): number {
        const yaochuHais = this.hais.filter(h => h.isYaochuHai());
        const hasToitsu = yaochuHais.some(h => this.counts[h.getId() - 1] >= 2);
        const yaochuCount = [...new Set(yaochuHais.map(h => h.getId()))].length;
        return 13 - yaochuCount - (hasToitsu ? 1 : 0);
    }
}