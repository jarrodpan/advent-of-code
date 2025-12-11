import fs from 'fs';

console.log('Advent of Code 2025/06');
const input = fs.readFileSync('./2025/06/input.txt', 'utf-8').split('\n');

let ans = 0;

const table: string[][] = [];

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  table.push(line.trim().replace(/\s+/g, ' ').split(' '));

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

console.table(table);

const getCol = (j: number) => {
  let col = [];
  for (let i = 0; i < table.length - 1; i++) {
    col.push(table[i][j]);
  }
  return col.map(Number);
};

const operationRow = table.length - 1;

for (let i = 0; i < table[0].length; i++) {
  const col = getCol(i);
  const operation = table[operationRow][i];
  let output = 0;
  if (operation === '*') {
    output = col.reduce((x, y) => x * y, 1);
  }
  if (operation === '+') {
    output = col.reduce((x, y) => x + y, 0);
  }

  ans += output;
  console.log(col, operation, output, ans);
}

// console.log(getCol(0));

console.log({ ans });
