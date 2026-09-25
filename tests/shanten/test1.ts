export const cases1 = [
  {
    name: "naki_1_1",
    hais: [1,2,3,4,5,6,7,8,10,11],
    expected: 1
  },
  {
    name: "naki_1_2",
    hais: [1,2,3,4,5,6,7,8,9,11],
    expected: 0
  },
  {
    name: "naki_2_1",
    hais: [1,2,3,4,5,6,7],
    expected: 0
  },
  {
    name: "naki_2_2",
    hais: [1,2,3,4,5,8,9],
    expected: 1
  },
  {
    name: "naki_3_1",
    hais: [1,2,4,5],
    expected: 1
  },
  {
    name: "naki_3_2",
    hais: [1,2,3,4],
    expected: 0
  },
  {
    name: "naki_4",
    hais: [1],
    expected: 0
  },
  {
    name: "churenagari",
    hais: [1,1,1,1,2,3,4,5,6,7,8,9,9,9],
    expected: -1
  },
  {
    name: "churen9",
    hais: [1,1,1,2,3,4,5,6,7,8,9,9,9],
    expected: 0
  },
  {
    name: "tenpai_1",
    hais: [1,1,1,2,3,4,5,5,6,7,8,8,9],
    expected: 0
  },
  {
    name: "shanten1_1",
    hais: [1,1,1,2,3,4,5,5,5,6,8,8,9],
    expected: 1
  },
  {
    name: "shanten1_2",
    hais: [1,1,1,2,3,3,4,5,5,6,8,8,9],
    expected: 1
  },
  {
    name: "shanten1_3",
    hais: [1,1,1,2,5,12,12,12,13,14,15,17,17],
    expected: 1
  },
  {
    name: "shanten2_1",
    hais: [1,1,1,2,5,11,12,12,13,14,15,17,18],
    expected: 2
  },
  {
    name: "shanten2_2",
    hais: [1,1,1,2,5,11,12,13,14,15,17,18,28],
    expected: 2
  },
  {
    name: "shanten3_1",
    hais: [1,1,1,2,5,12,12,13,14,15,17,28,29],
    expected: 3
  },
  {
    name: "shanten3_2",
    hais: [1,2,4,5,7,8,12,13,15,17,19,19,22],
    expected: 3
  },
  {
    name: "shanten4_1",
    hais: [1,2,3,5,9,11,13,17,20,25,26,31,32],
    expected: 4
  },
  {
    name: "shanten5_1",
    hais: [1,2,3,5,9,11,13,17,20,25,29,31,32],
    expected: 5
  },
  {
    name: "shanten6_1",
    hais: [1,3,5,9,11,13,17,20,25,29,31,32,33],
    expected: 6
  },
  {
    name: "shanten6_3",
    hais: [1,4,8,11,14,17,22,27,28,29,30,32,33],
    expected: 6
  },
  {
    name: "chitoi_1",
    hais: [1,1,4,4,9,9,13,13,17,17,21,21,28,28],
    expected: -1
  },
  {
    name: "chitoi_2",
    hais: [1,1,4,4,9,9,13,13,17,17,21,21,28],
    expected: 0
  },
  {
    name: "kokushi_1",
    hais: [1,9,10,18,19,27,28,29,30,31,32,33,34],
    expected: 0
  },
  {
    name: "kokushi_2",
    hais: [1,9,10,10,19,27,28,29,30,31,32,33,34],
    expected: 0
  },
  {
    name: "kokushi_3",
    hais: [1,9,10,17,19,27,28,29,30,31,32,33,34],
    expected: 1
  },
  {
    name: "kokushi_4",
    hais: [1,9,10,10,10,27,28,29,30,31,32,33,34],
    expected: 1
  },
]