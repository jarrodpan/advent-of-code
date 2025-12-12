import fs from 'fs';

console.log('Advent of Code 2025/07');
const input = fs
  .readFileSync('./2025/07/input.txt', 'utf-8')
  .split('\n')
  .map((x) => x.split(''));

let ans = 0;

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === 'S') line[j] = '|';
    if (char === '.') {
      if (input[i - 1]?.[j] === '|') {
        console.log('propagate beam', i, j);
        input[i][j] = '|';
      }
    }
    if (char === '^' && input[i - 1]?.[j] === '|') {
      ans++;
      line[j - 1] = '|';
      line[j + 1] = '|';

      console.log('split beam', i, j, ans);
    }
  }

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

console.log(input.map((r) => r.join('')).join('\n'));

const memo: number[][] = new Array(input.length);
for (let i = 0; i < input.length; i++) {
  memo[i] = new Array(input[0].length).fill(0);
}
const i = input.length - 1;
for (let j = 0; j < input[0].length; j++) {
  memo[i][j] = input[i][j] === '|' ? 1 : 0;
}

for (let i = input.length - 2; i >= 0; i--) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === '|') {
      memo[i][j] = memo[i + 1][j];
    }
  }
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === '^') {
      memo[i][j] = memo[i][j - 1] + memo[i][j + 1];
    }
  }
}

ans = memo[0].reduce((x, y) => x + y, 0);
// console.log(memo.map((r) => r.join('')).join('\n'));
console.table(memo);

console.log({ ans });
