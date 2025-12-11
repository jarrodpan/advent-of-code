import fs from 'fs';
import { isJsxFragment } from 'typescript';

console.log('Advent of Code 2025/05');
const input = fs.readFileSync('./2025/05/input.txt', 'utf-8').split('\n');

let ans = 0;

let rangesParsed = false;

const parseRange = (range: string) => {
  return range.split('-').map(Number);
};

const mergeRanges = (ranges: number[][]) => {
  return ranges.sort((a, b) => a[0] - b[0]);

  // const newRanges = [ranges[0]];
  // for (let i = 1; i < ranges.length; i++) {
  //   if (newRanges.at(-1)![1] >= ranges[i][0]) {
  //     newRanges.at(-1)![1] = ranges[i][1];
  //   } else {
  //     newRanges.push(ranges[i]);
  //   }
  // }

  // return newRanges;
};

let ranges: number[][] = [];
let ids: number[] = [];

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  if (line === '') {
    rangesParsed = true;
    continue;
  }

  if (!rangesParsed) {
    ranges.push(parseRange(line));
  } else {
    ids.push(Number(line));
  }
}

ranges = mergeRanges(ranges);
console.log('ranges merged');
console.table(ranges);

ids.sort((a, b) => a - b);

console.log(ids);

const idCount = ids.length;
let spoiled = 0;
let fresh = 0;

for (const id of ids) {
  let isFresh = false;
  while (ranges.length && id > ranges[0][1]) {
    console.log('shifted', ranges.shift());
  }
  for (const [lower, upper] of ranges) {
    if (id > upper) continue;
    if (id < lower) break;
    // if (id >= lower && id <= upper) {
    isFresh = true;
    break;
    // }
  }
  if (isFresh) {
    fresh++;
    console.log('fresh', id, fresh);
  } else {
    spoiled++;
    console.log('spoiled', id, spoiled);
  }
}

// for (const id of ids) {
//   while (ranges.length > 0 && id > ranges[0][1]) {
//     const old = ranges.shift();
//     console.log('shifted', old);
//   }
//   if (ranges.length > 0 && id < ranges[0][0]) {
//     console.log('spoiled', id);
//     ans--;
//     continue;
//   }
//   if (ranges.length === 0) {
//     console.log('spoiled', id);
//     ans--;
//     continue;
//   }
//   if (id >= ranges[0][0] && id <= ranges[0][1]) {
//     console.log('fresh', id);
//     continue;
//   }
// }

console.log({ ans: fresh });

// 568 too low
