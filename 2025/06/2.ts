import fs from 'fs';

console.log('Advent of Code 2025/06');
const input = fs.readFileSync('./2025/06/input.txt', 'utf-8').split('\n');

let ans = 0;

const ops: string[] = [];

const isSign = (s: string) => ['+', '*'].includes(s);

for (let i = input[0].length - 1; i >= 0; i--) {
  let str: string[] = [];
  for (let j = 0; j < input.length; j++) {
    str.push(input[j][i]);
  }
  let sign = '';
  if (isSign(str[str.length - 1])) {
    sign = str.pop()!;
  }
  const num = str.join('').trim();
  if (num === '') continue;
  ops.push(num);
  if (sign.trim() !== '') ops.push(sign);
}

console.log(ops);
let buf = [];
while (ops.length > 0) {
  const next = ops.shift()!;
  if (!isSign(next)) {
    buf.push(next);
  } else {
    let output = 0;
    if (next === '+') {
      output = buf.map(Number).reduce((x, y) => x + y, 0);
    } else {
      output = buf.map(Number).reduce((x, y) => x * y, 1);
    }
    ans += output;
    console.log(buf, next, output, ans);
    buf = [];
  }
}

// console.log(getCol(0));

console.log({ ans });
