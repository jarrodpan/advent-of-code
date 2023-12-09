import fs from 'fs';
import gcd from 'gcd';

console.log('Advent of Code 2023/08');
const input = fs.readFileSync('./2023/08/input.txt', 'utf-8').split('\n');

type Step = 'L' | 'R';

const instr = input[0].split('');
const network: Record<string, Record<Step, string>> = {};

for (let i = 2; i < input.length; i++) {
  const line = input[i];

  const groups = line.match(/(?<key>\w+) = \((?<L>\w+), (?<R>\w+)\)/)!.groups!;
  network[groups.key] = { L: groups.L, R: groups.R };
}

console.table(network);

let locs = Object.keys(network).filter((key) => key.endsWith('A'));

let count: number[] = [];

for (const loc of locs) {
  let steps = 0;
  let node = loc;
  while (!node.endsWith('Z')) {
    const nextStep = instr[steps++ % instr.length];
    node = network[node][nextStep as Step];
  }
  count.push(steps);
}

const lcm = count.reduce((v, u) => (v * u) / gcd(v, u), 1);

console.log({ lcm });

// 6153701190 too low
// 12560000000 too low
// 85360000000 too low
