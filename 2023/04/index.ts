import fs from 'fs';

console.log('Advent of Code 2023/04');
const input = fs.readFileSync('./2023/04/input.txt', 'utf-8').split('\n');

let ans = 0;

for (let i = 0; i < input.length; i++) {
  const line = input[i].split(' ');

  line.shift();
  line.shift();
  const nums = [];
  while (line[0] !== '|') {
    if (line[0] === '') line.shift();
    nums.push(line.shift()!);
  }

  line.shift();
  const have = [];
  while (line[0] !== undefined) {
    if (line[0] === '') line.shift();
    have.push(line.shift()!);
  }

  let score = 0;
  for (const num of nums) {
    if (have.includes(num)) {
      if (score === 0) {
        score = 1;
      } else score = score * 2;
    }
  }

  ans += score;

  console.log({ nums, have, score });

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

console.log({ ans });
