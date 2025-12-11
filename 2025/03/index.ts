import fs from 'fs';

console.log('Advent of Code 2025/03');
const input = fs.readFileSync('./2025/03/input.txt', 'utf-8').split('\n');

let ans = 0;

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  const memo = new Array<number>(line.length).fill(0);
  memo[line.length - 1] = Number(line.at(-1));
  let joltage = 0;

  // work backwards- what is the largest battery after this cell?
  for (let i = line.length - 2; i >= 0; i--) {
    memo[i] = Math.max(memo[i + 1] ?? 0, Number(line[i + 1] ?? 0));
    const newJoltage = Number(line[i] + memo[i]);
    joltage = Math.max(joltage, newJoltage);
    // console.log({ joltage, newJoltage });
  }

  console.log();
  console.log(joltage);
  console.log(line.split('').map(Number));
  console.log(memo);

  ans += joltage;

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

console.log({ ans });

// test 357
