import { YakuCheckerBase } from './YakuCheckerBase.js';
import { YakuContext } from './YakuContext.js';
import { TsuisoChecker } from './yakuman/TsuisoChecker.js';
import { ChinrotoChecker } from './yakuman/ChinrotoChecker.js';
import { RyuisoChecker } from './yakuman/RyuisoChecker.js';
import { SukantsuChecker } from './yakuman/SukantsuChecker.js';
import { ChurenChecker } from './yakuman/ChurenChecker.js';
import { Churen9Checker } from './yakuman/Churen9Checker.js';
import { SuankoChecker } from './yakuman/SuankoChecker.js';
import { SuankoTankiChecker } from './yakuman/SuankoTankiChecker.js';
import { KokushiChecker } from './yakuman/KokushiChecker.js';
import { Kokushi13Checker } from './yakuman/Kokushi13Checker.js';
import { DaisushiChecker } from './yakuman/DaisushiChecker.js';
import { ShosushiChecker } from './yakuman/ShosushiChecker.js';
import { DaisangenChecker } from './yakuman/DaisangenChecker.js';

import { ChinitsuChecker } from './normal/ChinitsuChecker.js';
import { HonitsuChecker } from './normal/HonitsuChecker.js';
import { JunchanChecker } from './normal/JunchanChecker.js';
import { HonchanChecker } from './normal/HonchanChecker.js';
import { HonrotoChecker } from './normal/HonrotoChecker.js';
import { RyanpekoChecker } from './normal/RyanpekoChecker.js';
import { ChitoitsuChecker } from './normal/ChitoitsuChecker.js';
import { SanankoChecker } from './normal/SanankoChecker.js';
import { ToitoiChecker } from './normal/ToitoiChecker.js';
import { IipekoChecker } from './normal/IipekoChecker.js';
import { ShosangenChecker } from './normal/ShosangenChecker.js';
import { SanshokuChecker } from './normal/SanshokuChecker.js';
import { DoukouChecker } from './normal/DoukouChecker.js';
import { IttsuuChecker } from './normal/IttsuuChecker.js';
import { TanyaoChecker } from './normal/TanyaoChecker.js';
import { SankantsuChecker } from './normal/SankantsuChecker.js';
import { MenzenTsumoChecker } from './normal/MenzenTsumoChecker.js';
import { PinfuChecker } from './normal/PinfuChecker.js';
import { RenpuuhaiChecker } from './normal/RenpuuhaiChecker.js';
import { YakuhaiChecker } from './normal/YakuhaiChecker.js';
import { KazehaiChecker } from './normal/KazehaiChecker.js';

export type YakuCheckerFactory =
    (context: YakuContext) => YakuCheckerBase;

export const YakumanCheckers: YakuCheckerFactory[] = [
    ctx => new TsuisoChecker(ctx),
    ctx => new ChinrotoChecker(ctx),
    ctx => new RyuisoChecker(ctx),
    ctx => new SukantsuChecker(ctx),
    ctx => new ChurenChecker(ctx),
    ctx => new Churen9Checker(ctx),
    ctx => new SuankoChecker(ctx),
    ctx => new SuankoTankiChecker(ctx),
    ctx => new KokushiChecker(ctx),
    ctx => new Kokushi13Checker(ctx),
    ctx => new DaisushiChecker(ctx),
    ctx => new ShosushiChecker(ctx),
    ctx => new DaisangenChecker(ctx),
];

export const NormalYakuCheckers: YakuCheckerFactory[] = [
    ctx => new ChinitsuChecker(ctx),
    ctx => new HonitsuChecker(ctx),
    ctx => new JunchanChecker(ctx),
    ctx => new HonchanChecker(ctx),
    ctx => new HonrotoChecker(ctx),
    ctx => new RyanpekoChecker(ctx),
    ctx => new ChitoitsuChecker(ctx),
    ctx => new SanankoChecker(ctx),
    ctx => new ToitoiChecker(ctx),
    ctx => new IipekoChecker(ctx),
    ctx => new ShosangenChecker(ctx),
    ctx => new SanshokuChecker(ctx),
    ctx => new DoukouChecker(ctx),
    ctx => new IttsuuChecker(ctx),
    ctx => new TanyaoChecker(ctx),
    ctx => new SankantsuChecker(ctx),
    ctx => new MenzenTsumoChecker(ctx),
    ctx => new PinfuChecker(ctx),
    ctx => new RenpuuhaiChecker(ctx),
    ctx => new KazehaiChecker(ctx, "自風牌", ctx.ctx.playerWind, ctx.ctx.roundWind),
    ctx => new KazehaiChecker(ctx, "場風牌", ctx.ctx.roundWind, ctx.ctx.playerWind),
    ctx => new YakuhaiChecker(ctx, 32, "白"),
    ctx => new YakuhaiChecker(ctx, 33, "發"),
    ctx => new YakuhaiChecker(ctx, 34, "中"),
];