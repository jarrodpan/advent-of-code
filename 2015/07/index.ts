import fs from 'fs';

console.log('Advent of Code 2015/07');
const data = fs.readFileSync('./2015/07/input.txt', 'utf-8').split('\n');

const memory: Record<string, number> = {};

const AND = (l: string, r: string) =>
  memory[l] & memory[r] & 0b1111111111111111;
const OR = (l: string, r: string) =>
  (memory[l] | memory[r]) & 0b1111111111111111;
const LSHIFT = (l: string, r: string) =>
  (memory[l] << memory[r]) & 0b1111111111111111;
const RSHIFT = (l: string, r: string) => memory[l] >>> memory[r];
const NOT = (l: string) => (65536 + ~memory[l]) & 0b1111111111111111;

const OPCODES = { AND, OR, LSHIFT, RSHIFT, NOT };

type Op = {
  op: keyof typeof OPCODES;
  input: string[];
  output: string;
};

let ops: Op[] = [];

for (let i = 0; i < data.length; i++) {
  const line = data[i];
  const [operation, output] = line.split(' -> ');
  let input: string[];
  switch (true) {
    case operation.includes('AND'):
      input = operation.split(' AND ');
      ops.push({ op: 'AND', input, output });
      break;
    case operation.includes('OR'):
      input = operation.split(' OR ');
      ops.push({ op: 'OR', input, output });
      break;
    case operation.includes('LSHIFT'):
      input = operation.split(' LSHIFT ');
      memory[input[1]] = Number(input[1]);
      ops.push({ op: 'LSHIFT', input, output });
      break;
    case operation.includes('RSHIFT'):
      input = operation.split(' RSHIFT ');
      memory[input[1]] = Number(input[1]);
      ops.push({ op: 'RSHIFT', input, output });
      break;
    case operation.includes('NOT'):
      input = [operation.split('NOT ')[1]];
      ops.push({ op: 'NOT', input, output });
      break;
    default:
      memory[output] = Number(operation);
  }
}

while (ops.length > 0) {
  // console.table(memory);
  // console.table(ops);

  let newOps = [];
  for (const nextOp of ops) {
    let assigned = false;

    // console.log(nextOp);
    // console.log(
    //   nextOp.input[0],
    //   memory[nextOp.input[0]],
    //   nextOp.input[1],
    //   memory[nextOp.input[1]]
    // );

    if (nextOp.input.includes('a') || nextOp.output === 'a') {
      console.log({
        nextOp,
        memory: memory['a'],
      });
    }

    if (memory[nextOp.input[0]] == undefined) {
      newOps.push(nextOp);
      continue;
    }

    switch (nextOp.op) {
      case 'LSHIFT':
      case 'RSHIFT':
      case 'AND':
      case 'OR':
        if (memory[nextOp.input[1]] == undefined) break;
        memory[nextOp.output] = OPCODES[nextOp.op](
          nextOp.input[0],
          nextOp.input[1]
        );
        assigned = true;
        break;

      case 'NOT':
        memory[nextOp.output] = OPCODES.NOT(nextOp.input[0]);
        assigned = true;
        break;
    }

    // console.log({ nextOp, assigned, output: memory[nextOp.output] });

    if (!assigned) {
      newOps.push(nextOp);
    }
  }

  // console.log(newOps);

  ops = newOps;
}

console.table(memory);
console.log({ a: memory.a });
