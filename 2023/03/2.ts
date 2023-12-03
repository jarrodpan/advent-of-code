import fs from 'fs';

console.log('Advent of Code 2023/03');
const input = fs.readFileSync('./2023/03/input.txt', 'utf-8').split('\n');

let ans = 0;

const isNum = (s: string) => '0123456789'.split('').includes(s);
const isGear = (s: string) => '*'.includes(s);

const gears: any = {};
const numbers: any = {};

let num = '';
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    let isAdj = false;
    let neargear;
    if (!isNum(input[i][j])) continue;
    while (isNum(input[i][j])) {
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
      ]) {
        if (
          input[i + dx] &&
          input[i + dx][j + dy] &&
          isGear(input[i + dx][j + dy])
        ) {
          // if (!gears[i + dx]) gears[i + dx] = {};
          // if (!gears[i + dx][j + dy]) gears[i + dx][j + dy] = 1;
          if (!gears[`${i + dx}-${j + dy}`]) gears[`${i + dx}-${j + dy}`] = [];
          // neargear = ${i + dx}-${j + dy}`;
          neargear = `${i + dx}-${j + dy}`;
        }
      }

      num += input[i][j];
      j++;
    }
    // console.log({ i, j, num });
    if (!numbers[i]) numbers[i] = {};
    numbers[i][j] = Number(num);
    if (neargear) gears[neargear].push(numbers[i][j]);
    num = '';
  }
}

for (const ratios of Object.values<number[]>(gears)) {
  if (ratios.length > 1) ans += ratios.reduce((x, y) => x * y, 1);
}

console.log(numbers);
console.log(gears);

console.log({ ans });
