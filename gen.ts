import fs from 'fs';
import { exec } from 'child_process';

const [_node, _script, arg] = process.argv;

if (!arg || !arg.match(/20[0-9]{2}\/[0-9]{2}/)) {
  throw new Error(`Invalid format: ${arg}`);
}

const [year, day] = arg.split('/');

try {
  fs.mkdirSync(`./${year}`);
} catch (e) {}
try {
  fs.mkdirSync(`./${arg}`);
} catch (e) {}

fs.writeFileSync(`./${arg}/input.txt`, '');
fs.writeFileSync(`./${arg}/test.txt`, '');
// fs.writeFileSync(`./${arg}/test2.txt`, '');
fs.writeFileSync(
  `./${arg}/index.ts`,
  `import fs from 'fs';

console.log('Advent of Code ${arg}');
const input = fs.readFileSync('./${arg}/input.txt', 'utf-8').split('\\n');

let ans = 0;

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  
  // const groups = line.match(/(?<aaaaa>\\w+)(?<bbbbb>\\d+)/)!.groups!;
}

console.log({ ans });
`
);

exec(`code ./${arg}/index.ts ./${arg}/input.txt ./${arg}/test.txt`);
