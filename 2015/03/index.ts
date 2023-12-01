import fs from 'fs';

console.log('Advent of Code 2015/03');
const input = fs.readFileSync('./2015/03/input.txt', 'utf-8').split('\n');

let ans = 0;

const santas: any = {
  0: { x: 0, y: 0 },
  1: { x: 0, y: 0 },
};

let santa = 0;

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  const houses = new Set<string>(['0,0']);
  let x = 0,
    y = 0;

  for (const move of line) {
    switch (move) {
      case '^':
        santas[santa].y++;
        break;

      case 'v':
        santas[santa].y--;
        break;

      case '>':
        santas[santa].x++;
        break;

      case '<':
        santas[santa].x--;
        break;
    }
    houses.add(`${santas[santa].x},${santas[santa].y}`);
    santa = (santa + 1) % 2;
  }
  console.log(houses.size);
}

console.log({ ans });
