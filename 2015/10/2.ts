import fs from 'fs';

console.log('Advent of Code 2015/10');
const input = fs.readFileSync('./2015/10/input.txt', 'utf-8').split('\n');

let ans = 0;

const lookAndSay = (s: string) => {
  let out = [];
  for (let i = 0; i < s.length; i++) {
    let n = i;
    while (s[i] === s[i + 1]) i++;
    out.push(i - n + 1, s[i]);
  }
  return out.join('');
};

for (let i = 0; i < input.length; i++) {
  let line = input[i];
  for (let j = 0; j < 50; j++) {
    // console.log(line);
    line = lookAndSay(line);
  }
  // console.log(line);
  ans = line.length;
}

console.log({ ans });
