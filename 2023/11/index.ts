import fs from 'fs';
import { transpose } from '@util/transpose';

console.log('Advent of Code 2023/11');
const input = fs.readFileSync('./2023/11/test.txt', 'utf-8').split('\n');

let ans = 0;
const blankCols = [];
const blankRows = [];

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  const galaxies = line.split('').filter((x) => x === '#').length;
  if (galaxies > 0) continue;
  input.splice(i, 0, new Array(line.length).fill('.').join(''));
  i++;
  blankRows.push(i);
}

const tr = transpose(input.map((x) => x.split(''))).map((x) => x.join(''));
for (let i = 0; i < tr.length; i++) {
  const line = tr[i];
  const galaxies = line.split('').filter((x) => x === '#').length;
  if (galaxies > 0) continue;
  tr.splice(i, 0, new Array(line.length).fill('.').join(''));
  i++;
  blankCols.push(i);
}

const universe = transpose(tr.map((x) => x.split(''))).map((x) => x.join(''));

console.log({ blankCols, blankRows });

console.log(universe.join('\n'));

console.log({ ans });
