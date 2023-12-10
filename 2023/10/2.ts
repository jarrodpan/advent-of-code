import chalk from 'chalk';
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

const cov: string[][] = new Array(input.length);
for (let i = 0; i < dist.length; i++) {
  cov[i] = new Array<string>(input[i].length).fill(' ');
}

const parsePos = ([i, j, steps]: number[]) => {
  if (dist[i][j] !== -1) return [];
  dist[i][j] = steps;
  cov[i][j] = input[i][j];
  let next = [];
  const nextStep = steps + 1;

  switch (input[i][j]) {
    case 'S':
      if (['|', 'J', 'L'].includes(input[i - 1]?.[j]))
        next.push([i + 1, j, nextStep]);
      if (['|', 'F', '7'].includes(input[i + 1]?.[j]))
        next.push([i - 1, j, nextStep]);
      if (['-', '7', 'J'].includes(input[i]?.[j - 1]))
        next.push([i, j + 1, nextStep]);
      if (['-', 'F', 'L'].includes(input[i]?.[j + 1]))
        next.push([i, j - 1, nextStep]);
      // for input
      // input[i][j] = '|';
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

// ans = dist
//   .map((row) => row.reduce((x, y) => Math.max(x, y)))
//   .reduce((x, y) => Math.max(x, y));

console.table(cov.map((row) => row.join('')));

const flood = (i: number, j: number) => {
  if (i < 0 || j < 0 || i >= input.length || j >= input[i].length) return;
  if (cov[i][j] !== ' ') return;
  cov[i][j] = '.';
  flood(i + 1, j);
  flood(i + 1, j + 1);
  flood(i + 1, j - 1);
  flood(i - 1, j);
  flood(i - 1, j + 1);
  flood(i - 1, j - 1);
  flood(i, j + 1);
  flood(i, j - 1);
};

for (let i = 0; i < cov[0].length; i++) {
  flood(0, i);
  flood(cov.length - 1, i);
}

for (let i = 0; i < cov.length; i++) {
  flood(i, 0);
  flood(i, cov[0].length - 1);
}

for (let i = 0; i < cov.length; i++) {
  let cross = 0;
  for (let j = 0; j < cov[i].length; j++) {
    switch (cov[i][j]) {
      case ' ':
      case '.':
        // even number of crosses means outside
        if (cross % 2 === 0) cov[i][j] = '.';
      case '-':
        continue;
      case '|':
        cross++;
        continue;
      case 'F':
        j++;
        while (cov[i][j] === '-') j++;
        if (cov[i][j] === 'J') cross++;
        continue;
      case 'L':
        j++;
        while (cov[i][j] === '-') j++;
        if (cov[i][j] === '7') cross++;
        continue;
    }
  }
}

const visual = (x: string) => {
  const chars: any = {
    '|': '║',
    '-': '═',
    L: '╚',
    J: '╝',
    '7': '╗',
    F: '╔',
    S: chalk.bgGreen('+'),
    '.': chalk.bgCyan(' '),
  };
  return chars[x] || chalk.bgRed(' ');
};

console.log(
  cov
    .map((row, i) =>
      row.map((c, j) => (c === ' ' ? chalk.bgRed(' ') : visual(c))).join('')
    )
    .join('\n')
);

ans = cov.reduce((acc, row) => acc + row.filter((x) => x === ' ').length, 0);

console.log({ ans });

// 752 too high
// ans: 496 - 1 (start case missed)
