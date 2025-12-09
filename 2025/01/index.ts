import fs from 'fs';

console.log('Advent of Code 2025/01');
const input = fs.readFileSync('./2025/01/input.txt', 'utf-8').split('\n');

let ans = 0;

let dial = 50;

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  const sign = line[0] === 'L' ? -1 : 1;
  const value = sign * Number(line.substring(1));

  dial += value;
  if (dial < 0) dial += 100;
  dial %= 100;

  if (dial === 0) ans++;

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

console.log({ ans });
