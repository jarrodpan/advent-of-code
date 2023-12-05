import fs from 'fs';

console.log('Advent of Code 2023/05');
const input = fs.readFileSync('./2023/05/input.txt', 'utf-8').split('\n');

let ans = 0;

let seeds: Set<number[]>;

for (let i = 0; i < input.length; i++) {
  let line = input[i];

  if (line.length === 0) continue;

  if (line.startsWith('seeds: ')) {
    let seedList = line.split(' ').map((x) => Number(x));
    seedList.shift()!;
    seeds = new Set();

    while (seedList.length > 0) {
      let start = seedList.shift()!;
      let range = seedList.shift()!;
      seeds.add([start, start + range - 1]);
      console.log(start, range);
    }

    // seeds.delete(NaN);
    console.log(seeds);
  }

  if (line.endsWith('map:')) {
    // const [from, to] = line.split(' ')[0].split('-to-');
    console.log(line);
    i++;
    line = input[i];
    // console.log(line);
    let newSeeds = new Set<number[]>();
    while (line) {
      // console.log(line);
      const [x, y, range] = line.split(' ').map((x) => Number(x));
      let mapStart = y,
        mapEnd = y + range - 1;

      let transformStart = x;
      let transformEnd = x + range - 1;

      let deadSeeds = new Set<number[]>();

      for (const seed of seeds!) {
        const [start, end] = seed;
        if (end < mapStart || mapEnd < start) {
          deadSeeds!.add(seed);
          continue;
        }
        if (start < mapStart) {
          if (end < mapStart) continue;
          else if (end <= mapEnd) {
            // seeds!.delete(seed);
            deadSeeds!.add([start, mapStart - 1]);
            newSeeds!.add([transformStart, transformStart + end - mapStart]);
          } else if (mapEnd < end) {
            // seeds!.delete(seed);
            deadSeeds!.add([start, mapStart - 1]);
            newSeeds!.add([transformStart, transformEnd]);
            deadSeeds!.add([mapEnd + 1, end]);
          }
        } else if (mapStart <= start) {
          if (end <= mapEnd) {
            // seeds!.delete(seed);
            newSeeds!.add([
              transformStart + start - mapStart,
              transformStart + end - mapStart,
            ]);
          } else if (mapEnd < end) {
            // seeds!.delete(seed);
            newSeeds!.add([transformStart + start - mapStart, transformEnd]);
            deadSeeds!.add([mapEnd + 1, end]);
          }
        }
        // if (start >= y + range) break;
        // if (y <= seed && seed < y + range) {
        //   newSeeds.add(x + seed - y);
        //   seeds!.delete(seed);
        // }
      }

      seeds = deadSeeds;

      i++;
      line = input[i];
    }

    for (const seed of seeds!) newSeeds.add(seed);

    console.log(seeds!);

    // for (const seed of seeds!) newSeeds.add(seed);
    console.log(newSeeds.size);
    seeds = newSeeds;
  }

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;

  // const {} = groups;
}

console.log(Math.min(...Array.from(seeds!).flat()));
