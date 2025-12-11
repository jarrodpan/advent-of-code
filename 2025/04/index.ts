import fs from 'fs';

console.log('Advent of Code 2025/04');
const input = fs.readFileSync('./2025/04/input.txt', 'utf-8').split('\n');

let ans = 0;

const grid = input.map((row) => row.split(''));

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

const sumOfDirs = (x: number, y: number) => {
  if (grid[x][y] === '.') return 0;
  let count = 0;
  for (const [i, j] of DIRS) {
    const [dx, dy] = [x + i, y + j];
    count += grid[dx]?.[dy] === '@' ? 1 : 0;
    if (count >= 4) return 0;
  }
  console.log(x, ',', y);
  return 1;
};

ans = grid
  .map((row, x) => row.map((cell, y) => sumOfDirs(x, y)))
  .flat(1)
  .reduce<number>((x, y) => x + y, 0);

console.log({ ans });
