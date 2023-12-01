import fs from 'fs';

const input = fs.readFileSync('./2023/01/input.txt', 'utf-8').split('\n');

let ans = 0;

const num: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  0: 0,
};

for (const line of input) {
  let rep = line;
  let arr: any[] = [];

  while (rep.length > 0) {
    let found = false;
    for (const numb of Object.keys(num)) {
      if (rep.startsWith(numb)) {
        arr.push(num[numb]);
        // rep = rep.substring(numb.length);
        // found = true;
        break;
      }
    }
    // if (!found)
    rep = rep.substring(1);
  }

  let sum = arr[0] * 10 + arr[arr.length - 1];
  console.log({ line, arr, sum });

  ans += Number(sum);
}

console.log({ ans });
