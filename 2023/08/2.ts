import fs from 'fs';
import gcd from 'gcd';

console.log('Advent of Code 2023/08');
const input = fs.readFileSync('./2023/08/input.txt', 'utf-8').split('\n');

type Step = 'L' | 'R';

let ans = 0;

const instr = input[0].split('');
const network: Record<string, Record<Step, string>> = {};

for (let i = 2; i < input.length; i++) {
  const line = input[i];

  const groups = line.match(/(?<key>\w+) = \((?<L>\w+), (?<R>\w+)\)/)!.groups!;
  network[groups.key] = { L: groups.L, R: groups.R };
}

console.table(network);

let locs = Object.keys(network).filter((key) => key.endsWith('A'));
const sets = new Array<Set<string>>(locs.length);
const loopStart = new Array<number>(locs.length).fill(0);
for (let i = 0; i < sets.length; i++) sets[i] = new Set<string>([locs[i]]);
let elements = sets.map((x) => x.size).reduce((v, u) => v + u, 0);
let newElements = 0;
let steps = 0;
console.log(steps, locs);

while (elements !== newElements) {
  const nextStep = instr[steps++ % instr.length];

  locs = locs.map((loc) => network[loc][nextStep as Step]);
  locs.forEach((v, i) => {
    if (sets[i].has(v)) {
      if (loopStart[i] === 0) {
        loopStart[i] = Array.from(sets[i]).indexOf(v);
      }
      return;
    }
    sets[i].add(v);
  });
  elements = newElements;
  newElements = sets.map((x) => x.size).reduce((v, u) => v + u, 0);

  console.log(steps, newElements);
  // let newLocs: string[] = [];
  // for (const loc of locs) newLocs.push(network[loc][nextStep as Step]);
  // steps++;
}

const lens = sets.map((x) => x.size);
const loopLens = lens.map((v, i) => v - loopStart[i]);

//const lcm = loopLens.reduce((v, u) => (v * u) / gcd(v, u), 1);

console.log({ lens, loopStart });
console.log({ loopLens });

let multiples = [...lens];

while (!multiples.every((x) => x === multiples[0])) {
  const min = Math.min(...multiples);
  const minI = multiples.indexOf(min);
  multiples[minI] += loopLens[minI];
  if (multiples[0] % 1000000 === 0) console.log(multiples);
}
console.log(multiples);
// co; //nsole.log({ lcm });

// 6153701190 too low
// 12560000000 too low
