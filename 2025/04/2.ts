import fs from 'fs';

console.log('Advent of Code 2025/04');
const input = fs.readFileSync('./2025/04/test.txt', 'utf-8').split('\n');

let ans = 0;

let grid = input.map((row) => row.split(''));

const DIRS = [
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
];

let toRemove: number[][] = [];

const sumOfDirs = (x: number, y: number) => {
  if (grid[x][y] === '.') return 0;
  let count = 0;
  for (const [i, j] of DIRS) {
    const [dx, dy] = [x + i, y + j];
    count += grid[dx]?.[dy] === '@' ? 1 : 0;
    if (count >= 4) return 0;
  }
  console.log(x, ',', y);
  toRemove.push([x, y]);
  return 1;
};

while (true) {
  const removed = grid
    .map((row, x) => row.map((cell, y) => sumOfDirs(x, y)))
    .flat(1)
    .reduce<number>((x, y) => x + y, 0);

  if (removed === 0) break;
  ans += removed;
  for (const [x, y] of toRemove) {
    grid[x][y] = '.';
  }
  toRemove = [];

  console.log('removed', removed);
}

console.log({ ans });
