import fs from 'fs';

console.log('Advent of Code 2023/05');
const input = fs.readFileSync('./2023/05/input.txt', 'utf-8').split('\n');

let ans = 0;

let seeds: Set<number>;

for (let i = 0; i < input.length; i++) {
  let line = input[i];

  if (line.length === 0) continue;

  if (line.startsWith('seeds: ')) {
    seeds = new Set(line.split(' ').map((x) => Number(x)));
    seeds.delete(NaN);
  }

  if (line.endsWith('map:')) {
    const [from, to] = line.split(' ')[0].split('-to-');
    i++;
    line = input[i];
    // console.log(line);
    let newSeeds = new Set<number>();
    let ranges = [];
    while (line) {
      console.log(line);
      ranges.push(line.split(' ').map((x) => Number(x)));
      i++;
      line = input[i];
    }
    for (const seed of seeds!) {
      for (const [x, y, range] of ranges) {
        if (y <= seed && seed < y + range) {
          newSeeds.add(x + seed - y);
          seeds!.delete(seed);
        }
      }
    }
    for (const seed of seeds!) newSeeds.add(seed);
    console.log({ seeds: seeds!, newSeeds });
    seeds = newSeeds;
  }

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;

  // const {} = groups;
}

console.log(Math.min(...Array.from(seeds!)));
