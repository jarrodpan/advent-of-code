import fs from 'fs';

console.log('Advent of Code 2023/10');
const input = fs
  .readFileSync('./2023/10/input.txt', 'utf-8')
  .split('\n')
  .map((x) => x.split(''));

let ans = 0;

let startPos = [-1, -1];

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  const j = line.findIndex((x) => x === 'S');

  if (j > -1) {
    startPos = [i, j];
    break;
  }
}

console.log({ startPos });

const dist: number[][] = new Array(input.length);
for (let i = 0; i < dist.length; i++) {
  dist[i] = new Array<number>(input[i].length).fill(-1);
}

const parsePos = ([i, j, steps]: number[]) => {
  if (dist[i][j] !== -1) return [];
  dist[i][j] = steps;
  let next = [];
  const nextStep = steps + 1;

  switch (input[i][j]) {
    case 'S':
      if (['|', 'J', 'L'].includes(input[i + 1][j]))
        next.push([i + 1, j, nextStep]);
      if (['|', 'F', '7'].includes(input[i - 1][j]))
        next.push([i - 1, j, nextStep]);
      if (['-', '7', 'J'].includes(input[i][j + 1]))
        next.push([i, j + 1, nextStep]);
      if (['-', 'F', 'L'].includes(input[i][j - 1]))
        next.push([i, j - 1, nextStep]);
      break;
    case 'F':
      next.push([i + 1, j, nextStep]);
      next.push([i, j + 1, nextStep]);
      break;

    case 'J':
      next.push([i - 1, j, nextStep]);
      next.push([i, j - 1, nextStep]);
      break;

    case 'L':
      next.push([i - 1, j, nextStep]);
      next.push([i, j + 1, nextStep]);
      break;
    case '7':
      next.push([i + 1, j, nextStep]);
      next.push([i, j - 1, nextStep]);
      break;
    case '-':
      next.push([i, j + 1, nextStep]);
      next.push([i, j - 1, nextStep]);
      break;
    case '|':
      next.push([i + 1, j, nextStep]);
      next.push([i - 1, j, nextStep]);
      break;
  }
  return next;
};

const queue: number[][] = [[...startPos, 0]];

while (queue.length > 0) {
  const pos = queue.shift()!;
  // console.log({ pos, queue });
  const next = parsePos(pos);
  queue.push(...next);
}

ans = dist
  .map((row) => row.reduce((x, y) => Math.max(x, y)))
  .reduce((x, y) => Math.max(x, y));

console.table(dist.map((row) => row.map((x) => (x === -1 ? '.' : String(x)))));
console.log({ ans });
