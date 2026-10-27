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
        const usableToitsu = Math.max(toitsuCount - 1, 0);
        const usableTaatsu = Math.min(taatsuCount + usableToitsu, Math.max(0, requiredMentsuCount - mentsuCount));
        const usableJanto = Math.min(toitsuCount, 1);
        return 8 - 2 * (4 - requiredMentsuCount + mentsuCount) - usableTaatsu - usableJanto;
    }

    public calculateNormal(): number {
        let minShanten = 8;
        const requiredMentsuCount = Math.floor(this.hais.length / 3);
        const visited = new Set<string>();
        const dfs = (
            arr: number[],
            mentsuCount: number,
            taatsuCount: number,
            toitsuCount: number,
        ) => {
            const key = arr.join("") + `:${mentsuCount}:${taatsuCount}:${toitsuCount}`;
            if (visited.has(key)) return;
            visited.add(key);

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
                arr[firstIndex] -= 2;
                dfs(arr, mentsuCount, taatsuCount, toitsuCount + 1);
                arr[firstIndex] += 2;
            }
            //刻子
            if(count >= 3){
                arr[firstIndex] -= 3;
                dfs(arr, mentsuCount + 1, taatsuCount, toitsuCount);
                arr[firstIndex] += 3;
            }
            //順子
            const hasShuntsuTiles =
                arr[firstIndex + 1] > 0 &&
                arr[firstIndex + 2] > 0;
            const isShuntsuCandidate = hai.isNumberHai() && hai.num <= 7;
            if(isShuntsuCandidate && hasShuntsuTiles){
                arr[firstIndex]--;
                arr[firstIndex + 1]--;
                arr[firstIndex + 2]--;
                dfs(arr, mentsuCount + 1, taatsuCount, toitsuCount);
                arr[firstIndex]++;
                arr[firstIndex + 1]++;
                arr[firstIndex + 2]++;
            }
            //両面、辺張ターツ
            const hasRyanmenTiles = arr[firstIndex + 1] > 0;
            const isRyanmenCandidate = hai.isNumberHai() && hai.num <= 8;
            if(isRyanmenCandidate && hasRyanmenTiles){
                arr[firstIndex]--;
                arr[firstIndex + 1]--;
                dfs(arr, mentsuCount, taatsuCount + 1, toitsuCount);
                arr[firstIndex]++;
                arr[firstIndex + 1]++;
            }
            //嵌張ターツ
            const hasKanchanTiles = arr[firstIndex + 2] > 0;
            const isKanchanCandidate = hai.isNumberHai() && hai.num <= 7;
            if(isKanchanCandidate && hasKanchanTiles){
                arr[firstIndex]--;
                arr[firstIndex + 2]--;
                dfs(arr, mentsuCount, taatsuCount + 1, toitsuCount);
                arr[firstIndex]++;
                arr[firstIndex + 2]++;
            }

            //孤立牌
            arr[firstIndex]--;
            dfs(arr, mentsuCount, taatsuCount, toitsuCount);
            arr[firstIndex]++;
        }

        dfs(this.counts, 0, 0, 0);

        return minShanten;
    }
    
    public calculateChitoitsu(): number {
        const haiNumsSet = [...new Set(this.hais.map(h => h.getId()))];
        const toitsuCount = haiNumsSet.filter(n => this.counts[n - 1] >= 2).length;
        return 6 - toitsuCount + Math.max(0, 7 - haiNumsSet.length);
    }

    public calculateKokushi(): number {
        const yaochuHais = this.hais.filter(h => h.isYaochuHai());
        const hasToitsu = yaochuHais.some(h => this.counts[h.getId() - 1] >= 2);
        const yaochuCount = [...new Set(yaochuHais.map(h => h.getId()))].length;
        return 13 - yaochuCount - (hasToitsu ? 1 : 0);
    }
}