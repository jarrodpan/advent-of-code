import fs from 'fs';

console.log('Advent of Code 2015/05');
const input = fs.readFileSync('./2015/05/input.txt', 'utf-8').split('\n');

let ans = 0;

const vowel = (s: string) => {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if ('aeiou'.includes(s[i])) count++;
  }

  return count >= 3;
};

const double = (s: string) => {
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === s[i + 1]) return true;
  }
  return false;
};

const noBadPairs = (s: string) => {
  for (const bad of ['ab', 'cd', 'pq', 'xy']) if (s.includes(bad)) return false;
  return true;
};

const nice = (s: string) => vowel(s) && double(s) && noBadPairs(s);

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  let isNice = nice(line);
  console.log([line, isNice]);
  if (isNice) ans++;
}

console.log({ ans });
