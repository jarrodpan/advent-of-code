import fs from 'fs';

console.log('Advent of Code 2023/03');
const input = fs.readFileSync('./2023/03/input.txt', 'utf-8').split('\n');

let ans = 0;

const isNum = (s: string) => '0123456789'.split('').includes(s);

let num = '';
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    let isAdj = false;
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
          !isNum(input[i + dx][j + dy]) &&
          input[i + dx][j + dy] !== '.'
        )
          isAdj = true;
      }

      num += input[i][j];
      j++;
    }
    console.log({ i, j, num });
    if (isAdj) ans += Number(num);
    num = '';
  }
}

console.log({ ans });
