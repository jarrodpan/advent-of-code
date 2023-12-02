import fs from 'fs';

console.log('Advent of Code 2015/11');
const input = fs.readFileSync('./2015/11/input.txt', 'utf-8').split('\n');

const a = 'a'.charCodeAt(0),
  i = 'i'.charCodeAt(0),
  o = 'o'.charCodeAt(0),
  l = 'l'.charCodeAt(0),
  z = 'z'.charCodeAt(0);

console.log({ a, z });

const increment = (arr: number[]) => {
  arr[arr.length - 1]++;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] > z) {
      arr[i] = a;
      arr[i - 1]++;
    }
  }
};

const threeLetters = (arr: number[]) => {
  for (let i = 0; i < arr.length - 2; i++) {
    if (arr[i] + 1 === arr[i + 1] && arr[i + 1] + 1 === arr[i + 2]) return true;
  }
  return false;
};

const noForbiddenLetters = (arr: number[]) => {
  for (let j = 0; j < arr.length; j++) {
    if ([i, o, l].includes(arr[j])) return false;
  }
  return true;
};

const twoPairs = (arr: number[]) => {
  let first = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === first) continue;
    if (arr[i] === arr[i + 1]) {
      if (first > 0) return true;
      else first = arr[i];
      i++;
    }
  }
  return false;
};

const valid = (arr: number[]) =>
  threeLetters(arr) && noForbiddenLetters(arr) && twoPairs(arr);

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  const code = line.split('').map((x) => x.charCodeAt(0));

  while (!valid(code)) {
    increment(code);
  }

  const newPassword = code.map((x) => String.fromCharCode(x)).join('');
  console.log({
    old: line,
    new: newPassword,
  });
}
