import { UkeireCase } from "../testConsts";

export const casesNoSpecial: UkeireCase[] = [
  {
    name: "tenpai_1",
    haiNum: [1,1,2,2,3,3,4,5,6,10,11,12,13],
    includeSpecial: false,
    expected: [10,13]
  },
  {
    name: "shanten_1_1",
    haiNum: [1,1,2,2,3,3,4,5,6,10,11,13,14],
    includeSpecial: false,
    expected: [10,11,12,13,14,15]
  },
  {
    name: "shanten_1_2",
    haiNum: [1,2,2,4,5,6,6,6,6,7,7,8,9],
    includeSpecial: false,
    expected: [1,2,3,4,5,7,8,9]
  },
  {
    name: "shanten_1_3",
    haiNum: [4,4,4,5,6,6,6,6,7,7,7,8,12],
    includeSpecial: false,
    expected: [3,4,5,7,8,9,10,11,12,13,14]
  },
  {
    name: "shanten_1_4",
    haiNum: [1,1,2,2,2,3,3,4,5,6,7,7,8],
    includeSpecial: false,
    expected: [1,2,3,4,5,6,7,8,9]
  },
  {
    name: "shanten_3_1",
    haiNum: [1,9,10,18,19,27,28,28,28,29,29,29,30],
    includeSpecial: false,
    expected: [1,2,3,7,8,9,10,11,12,16,17,18,19,20,21,25,26,27,30]
  },
];