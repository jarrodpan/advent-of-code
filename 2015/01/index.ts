import fs from 'fs';

console.log('Advent of Code 2015/01');
const input = fs.readFileSync('./2015/01/input.txt', 'utf-8');

let floor = 0;
let basement = 0;
for (let i = 0; i < input.length; i++) {
  if (input[i] === '(') floor++;
  else floor--;

  if (basement === 0 && floor === -1) basement = i + 1;
}

console.log({ floor, basement });
