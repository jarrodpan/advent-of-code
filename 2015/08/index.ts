import fs from 'fs';

console.log('Advent of Code 2015/08');
const input = fs.readFileSync('./2015/08/test.txt', 'utf-8').split('\n');

let ans = 0;

const count = (s: string) => {
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\') {
      if (['\\', '"'].includes(s[i + 1])) i++;
      else i += 3;
    }
    n++;
  }
  return n - 2;
};

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  console.log({ line, count: count(line), length: line.length });
  ans += line.length - count(line);
}

console.log({ ans });
