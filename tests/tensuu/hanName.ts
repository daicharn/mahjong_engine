import { hanNameCase } from "../testConsts";

export const casesHanName: hanNameCase[] = [
    {
        name: "hon1",
        desc: "なし",
        han: 1,
        isYakuman: false,
        expected: ""
    },
    {
        name: "hon2",
        desc: "なし",
        han: 2,
        isYakuman: false,
        expected: ""
    },
    {
        name: "hon3",
        desc: "なし",
        han: 3,
        isYakuman: false,
        expected: ""
    },
    {
        name: "hon4",
        desc: "なし",
        han: 4,
        isYakuman: false,
        expected: ""
    },
    {
        name: "hon5",
        desc: "満貫",
        han: 5,
        isYakuman: false,
        expected: "満貫"
    },
    {
        name: "hon6",
        desc: "跳満",
        han: 6,
        isYakuman: false,
        expected: "跳満"
    },
    {
        name: "hon7",
        desc: "跳満",
        han: 7,
        isYakuman: false,
        expected: "跳満"
    },
    {
        name: "hon8",
        desc: "跳満",
        han: 8,
        isYakuman: false,
        expected: "倍満"
    },
    {
        name: "hon9",
        desc: "倍満",
        han: 9,
        isYakuman: false,
        expected: "倍満"
    },
    {
        name: "hon10",
        desc: "倍満",
        han: 10,
        isYakuman: false,
        expected: "倍満"
    },
    {
        name: "hon11",
        desc: "三倍満",
        han: 11,
        isYakuman: false,
        expected: "三倍満"
    },
    {
        name: "hon12",
        desc: "三倍満",
        han: 12,
        isYakuman: false,
        expected: "三倍満"
    },
    {
        name: "hon13",
        desc: "役満以上",
        han: 13,
        isYakuman: false,
        expected: "数え役満"
    },
    {
        name: "hon13",
        desc: "役満以上",
        han: 13,
        isYakuman: true,
        expected: "役満"
    },
    {
        name: "hon26",
        desc: "役満以上",
        han: 26,
        isYakuman: false,
        expected: "数え役満"
    },
    {
        name: "hon26",
        desc: "役満以上",
        han: 26,
        isYakuman: true,
        expected: "二倍役満"
    },
    {
        name: "hon39",
        desc: "役満以上",
        han: 39,
        isYakuman: true,
        expected: "三倍役満"
    },
    {
        name: "hon52",
        desc: "役満以上",
        han: 52,
        isYakuman: true,
        expected: "四倍役満"
    },
    {
        name: "hon65",
        desc: "役満以上",
        han: 65,
        isYakuman: true,
        expected: "五倍役満"
    },
    {
        name: "hon78",
        desc: "役満以上",
        han: 78,
        isYakuman: true,
        expected: "六倍役満"
    },
    {
        name: "hon79",
        desc: "役満以上",
        han: 79,
        isYakuman: true,
        expected: "六倍役満"
    },
]