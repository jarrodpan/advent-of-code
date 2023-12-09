import fs from 'fs';

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

let loc = 'AAA';
let steps = 0;

while (loc !== 'ZZZ') {
  const nextStep = instr[steps % instr.length];
  loc = network[loc][nextStep as Step];
  steps++;
}

console.log({ steps });
