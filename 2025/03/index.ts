import fs from 'fs';

console.log('Advent of Code 2025/03');
const input = fs.readFileSync('./2025/03/test.txt', 'utf-8').split('\n');

let ans = 0;

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

console.log({ ans });
