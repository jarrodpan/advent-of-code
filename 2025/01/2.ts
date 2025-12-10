import fs from 'fs';

console.log('Advent of Code 2025/01');
const input = fs.readFileSync('./2025/01/input.txt', 'utf-8').split('\n');

let ans = 0;

let dial = 50;

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  const dir = line[0];

  const sign = dir === 'L' ? -1 : 1;
  let value = sign * Number(line.substring(1));

  if (dir === 'L') {
    if (-value > dial) {
      value += dial;
      dial = 0;
      ans++;
    }
    while (value < -100) {
      value += 100;
      ans++;
    }
    dial += (100 + value) % 100;
    if (dial === 0) ans++;
  } else {
    if (dial + value >= 100) {
      value -= 100 - dial;
      dial = 0;
      ans++;
    }
    while (value >= 100) {
      value -= 100;
      ans++;
    }
    dial += value;
    if (dial === 0) ans++;
  }

  console.log('>>', line, dial, ans, '\n');

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

console.log({ ans });

// 6591 wrong
// 6886 wrong
// 7511 wrong
