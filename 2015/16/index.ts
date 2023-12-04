import fs from 'fs';

console.log('Advent of Code 2015/16');
const input = fs.readFileSync('./2015/16/input.txt', 'utf-8').split('\n');
const msg = fs.readFileSync('./2015/16/msg.txt', 'utf-8').split('\n');

let ans = 0;

const sues: Record<string, string | number>[] = [];

for (let i = 0; i < input.length; i++) {
  const groups = input[i].match(
    /Sue (?<sue>\d+): (?<i1>\w+): (?<n1>\d+), (?<i2>\w+): (?<n2>\d+), (?<i3>\w+): (?<n3>\d+)/
  )!.groups!;

  const { sue, n1, i1, n2, i2, n3, i3 } = groups;

  sues.push({
    [i1]: n1,
    [i2]: n2,
    [i3]: n3,
    i: i + 1,
  });
}

// console.table(sues);

let filteredSues = sues;

for (let i = 0; i < msg.length; i++) {
  const [thing, count] = msg[i].split(': ');

  filteredSues = filteredSues.filter((sue) => {
    if (sue[thing] === undefined) return true;
    return sue[thing] === count;
  });

  console.log(filteredSues);
}

// console.log(items);

console.log({ ans });
