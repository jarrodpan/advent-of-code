import fs from 'fs';

console.log('Advent of Code 2025/02');
const input = fs.readFileSync('./2025/02/input.txt', 'utf-8').split('\n');

let ans = 0;

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  const strRanges = line.split(',');
  const splitRanges = strRanges.map((r) => {
    return r.split('-');
  });

  const ranges = [];

  for (const range of splitRanges) {
    // exclude if odd length and same length for both ends
    // if (range[0].length === range[1].length && range[0].length % 2 === 1)
    //   continue;

    // bring odd length lower bound up to even
    let lower = Number(range[0]);
    // while (lower.toString().length % 2 === 1) lower++;

    // bring odd length upper bound down to even
    let upper = Number(range[1]);
    // while (upper.toString().length % 2 === 1) upper--;

    ranges.push([lower, upper]);

    console.log(range, ranges.at(-1)!);
  }

  ranges.sort((a, b) => a[0] - b[0]);

  console.table(ranges);

  // start with 1 and iterate, if the tested number exceeds the upper bound of the start of the array then shift it
  let test = 1;

  const testSet = new Set<number>();

  // pregenerate IDs
  let exceedsRange = false;
  let upperBound = ranges.at(-1)![1];
  while (test <= 99999) {
    let id = test;
    while (id.toString().length <= 10) {
      id = id * 10 ** test.toString().length + test;
      if (id > upperBound) break;
      testSet.add(id);
    }
    test++;
  }

  const testIds = Array.from(testSet).sort((a, b) => b - a);
  console.log(testIds);

  while (ranges.length > 0 && testIds.length > 0) {
    const id = testIds.pop()!;
    // pop ranges we have surpassed
    while (ranges.length && ranges[0][1] < id) {
      const excl = ranges.shift();
      console.log('shifted range', excl, 'remaining:', ranges.length);
    }
    if (ranges.length === 0) break;
    const [lower, upper] = ranges[0];
    if (lower <= id && id <= upper) {
      ans += id;
      console.log(lower, '<=', id, '<=', upper, '--->', ans);
    }

    // test++;
  }

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

console.log({ ans });

// test: 4174379265
