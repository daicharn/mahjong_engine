import { Hai } from "./Hai.js";
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

    private encodeCounts(counts: number[]): [number, number] {
        let low = 0;
        let high = 0;

        for (let i = 0; i < 17; i++) {
            low = low * 5 + counts[i];
            high = high * 5 + counts[i + (PAI_TYPE_NUM / 2)];
        }

        return [low, high];
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
            startIndex: number
        ) => {
            let firstIndex = startIndex;

            while(firstIndex < PAI_TYPE_NUM && arr[firstIndex] === 0) firstIndex++;

            if(firstIndex === PAI_TYPE_NUM) {
                const shanten = this.calculateShanten(
                    requiredMentsuCount,
                    mentsuCount,
                    taatsuCount,
                    toitsuCount
                );
                minShanten = Math.min(minShanten, shanten);
                return;
            }

            const key = this.encodeCounts(arr).toString() + `:${mentsuCount}:${taatsuCount}:${toitsuCount}`;
            if (visited.has(key)) return;
            visited.add(key);

            const count = arr[firstIndex];
            const isNumberHai = firstIndex < 27;
            const num = firstIndex % 9 + 1;

            const canShuntsu = isNumberHai && num <= 7;
            const canRyanmen = isNumberHai && num <= 8;

            //雀頭
            if(count >= 2){
                arr[firstIndex] -= 2;
                dfs(arr, mentsuCount, taatsuCount, toitsuCount + 1, firstIndex);
                arr[firstIndex] += 2;
            }
            //刻子
            if(count >= 3){
                arr[firstIndex] -= 3;
                dfs(arr, mentsuCount + 1, taatsuCount, toitsuCount, firstIndex);
                arr[firstIndex] += 3;
            }
            //順子
            const hasShuntsuTiles =
                arr[firstIndex + 1] > 0 &&
                arr[firstIndex + 2] > 0;
            if(canShuntsu && hasShuntsuTiles){
                arr[firstIndex]--;
                arr[firstIndex + 1]--;
                arr[firstIndex + 2]--;
                dfs(arr, mentsuCount + 1, taatsuCount, toitsuCount, firstIndex);
                arr[firstIndex]++;
                arr[firstIndex + 1]++;
                arr[firstIndex + 2]++;
            }
            //両面、辺張ターツ
            const hasRyanmenTiles = arr[firstIndex + 1] > 0;
            if(canRyanmen && hasRyanmenTiles){
                arr[firstIndex]--;
                arr[firstIndex + 1]--;
                dfs(arr, mentsuCount, taatsuCount + 1, toitsuCount, firstIndex);
                arr[firstIndex]++;
                arr[firstIndex + 1]++;
            }
            //嵌張ターツ
            const hasKanchanTiles = arr[firstIndex + 2] > 0;
            if(canShuntsu && hasKanchanTiles){
                arr[firstIndex]--;
                arr[firstIndex + 2]--;
                dfs(arr, mentsuCount, taatsuCount + 1, toitsuCount, firstIndex);
                arr[firstIndex]++;
                arr[firstIndex + 2]++;
            }

            //孤立牌
            arr[firstIndex]--;
            dfs(arr, mentsuCount, taatsuCount, toitsuCount, firstIndex);
            arr[firstIndex]++;
        }

        dfs(this.counts, 0, 0, 0, 0);

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