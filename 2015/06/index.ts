import fs from 'fs';

console.log('Advent of Code 2015/06');
const input = fs.readFileSync('./2015/06/input.txt', 'utf-8').split('\n');

let ans = 0;

const grid = new Array<number[]>(1000);
for (let i = 0; i < 1000; i++) grid[i] = new Array(1000).fill(0);

const through = (s: string) => {
  return s.split(' through ').map((x) => x.split(',').map((x) => Number(x)));
};

const turnOn = ([[x, y], [w, z]]: number[][]) => {
  for (let i = x; i <= w; i++) for (let j = y; j <= z; j++) grid[i][j] = 1;
};

const turnOff = ([[x, y], [w, z]]: number[][]) => {
  for (let i = x; i <= w; i++) for (let j = y; j <= z; j++) grid[i][j] = 0;
};

const toggle = ([[x, y], [w, z]]: number[][]) => {
  for (let i = x; i <= w; i++)
    for (let j = y; j <= z; j++) grid[i][j] = grid[i][j] === 1 ? 0 : 1;
};

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  switch (true) {
    case line.startsWith('turn on'):
      turnOn(through(line.substring('turn on '.length)));
      break;
    case line.startsWith('turn off'):
      turnOff(through(line.substring('turn off '.length)));
      break;
    case line.startsWith('toggle'):
      toggle(through(line.substring('toggle '.length)));
      break;
  }
}

for (const row of grid) {
  ans += row.reduce((x, y) => x + y, 0);
}

console.log({ ans });
