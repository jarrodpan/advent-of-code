import fs from 'fs';
import { createHash } from 'crypto';

console.log('Advent of Code 2015/04');
const input = fs.readFileSync('./2015/04/input.txt', 'utf-8').split('\n');

let ans = 0;

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  let hash = '';
  while (!hash.startsWith('00000')) {
    ans++;
    hash = createHash('md5').update(`${line}${ans}`).digest('hex');
  }
}

console.log({ ans });
