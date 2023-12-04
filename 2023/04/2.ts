import fs from 'fs';

console.log('Advent of Code 2023/04');
const input = fs.readFileSync('./2023/04/input.txt', 'utf-8').split('\n');

let cardCount: Record<string | number, number> = {};

for (let i = 1; i <= input.length; i++) cardCount[i] = 1;

let ans = 0;

for (let i = 0; i < input.length; i++) {
  const line = input[i].split(' ');
  const cardNum = i + 1;

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
      score++;
    }
  }

  for (let j = 0; j < score; j++) {
    const dupe = cardNum + j + 1;
    if (!cardCount[dupe]) break;
    cardCount[dupe] += cardCount[cardNum];
  }

  console.log({ nums, have, score });

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

console.log({ cardCount });

ans = Object.values<number>(cardCount).reduce((x, y) => x + y, 0);

console.log({ ans });
