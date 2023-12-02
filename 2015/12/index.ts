import fs from 'fs';

console.log('Advent of Code 2015/12');
const input = fs.readFileSync('./2015/12/input.txt', 'utf-8').split('\n');

const isDigit = (s: string) => '-0123456789'.split('').includes(s);

const parse = (s: string) => {
  let out = 0;
  let str = '';
  for (let i = 0; i < s.length; i++) {
    let x = i;
    if (isDigit(s[i])) str += s[i];
    else {
      out += Number(str);
      str = '';
    }
  }
  return out;
};

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  console.log({ in: line.substring(0, 10), out: parse(line) });
}
