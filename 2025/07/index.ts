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

console.log({ ans });
