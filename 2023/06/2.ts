import fs from 'fs';

console.log('Advent of Code 2023/06');
const input = fs.readFileSync('./2023/06/test.txt', 'utf-8').split('\n');

const times = input[0]
  .replace(/\s+/g, '')
  .replace('Time:', '')
  .split(' ')
  .map((x) => Number(x));

const dists = input[1]
  .replace(/\s+/g, '')
  .replace('Distance:', '')
  .split(' ')
  .map((x) => Number(x));

console.log({ times, dists });

const ans: number[] = [];

for (let n = 0; n < times.length; n++) {
  const [time, dist] = [times[n], dists[n]];
  let beats = 0;
  for (let i = 1; i < time; i++) {
    if (i * time - i * i > dist) beats++;
  }
  ans.push(beats);
}

console.log(ans);
console.log(ans.reduce((x, y) => x * y, 1));
