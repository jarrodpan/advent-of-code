import fs from 'fs';

console.log('Advent of Code 2015/17');
const input = fs.readFileSync('./2015/17/input.txt', 'utf-8').split('\n');

let ans = 0;

const buckets = input.map((x) => Number(x)).sort((a, b) => b - a);
const litres = 150;
console.log(buckets);

// for (let i = 0; i < input.length; i++) {
//   const line = input[i];

//   // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
// }

const dfs = (i: number = 0, sum: number = 0, hist: number[] = []) => {
  if (sum > litres) return;
  if (i === buckets.length) {
    if (sum === litres) {
      ans++;
      console.log(hist);
    }
    return;
  }
  dfs(i + 1, sum, [...hist]);
  dfs(i + 1, sum + buckets[i], [...hist, buckets[i]]);
};

dfs();

console.log({ ans });
