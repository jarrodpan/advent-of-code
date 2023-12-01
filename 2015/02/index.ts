import fs from 'fs';

console.log('Advent of Code 2015/02');
const input = fs.readFileSync('./2015/02/test.txt', 'utf-8').split('\n');

let ans = 0;
let ribbon = 0;
for (let i = 0; i < input.length; i++) {
  const [l, w, h] = input[i].split('x').map((x) => Number(x));
  console.log({ l, w, h });
  const [lw, wh, hl] = [l * w, w * h, h * l];
  const a = Math.min(lw, wh, hl);

  ans += 2 * (lw + wh + hl) + a;

  ribbon += 2 * (l + w + h) - 2 * Math.max(l, w, h) + l * w * h;
}

console.log({ ans, ribbon });
