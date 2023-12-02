import fs from 'fs';

console.log('Advent of Code 2015/05');
const input = fs.readFileSync('./2015/05/input.txt', 'utf-8').split('\n');

let ans = 0;

const twoPairs = (s: string) => {
  for (let i = 0; i < s.length; i++) {
    const pair = s[i] + s[i + 1];
    if (s.substring(i + 2).includes(pair)) return true;
  }

  return false;
};

const double = (s: string) => {
  for (let i = 0; i < s.length - 2; i++) {
    if (s[i] === s[i + 2]) return true;
  }
  return false;
};

const nice = (s: string) => twoPairs(s) && double(s);

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  let isNice = nice(line);
  console.log([line, isNice]);
  if (isNice) ans++;
}

console.log({ ans });
