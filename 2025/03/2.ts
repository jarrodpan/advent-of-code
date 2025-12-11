import fs from 'fs';

console.log('Advent of Code 2025/03');
const input = fs.readFileSync('./2025/03/test.txt', 'utf-8').split('\n');

let ans = 0;

// appraoch one : bottom up dp

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  const memo = new Array<number>(line.length).fill(0);
  memo[line.length - 1] = Number(line.at(-1));
  let joltage = 0;
  console.log();

  // work backwards- what is the largest battery after this cell?
  for (let i = line.length - 2; i >= 0; i--) {
    memo[i] = Math.max(memo[i + 1] ?? 0, Number(line[i + 1] ?? 0));
    const newJoltage = Number(line[i] + memo[i]);
    joltage = Math.max(joltage, newJoltage);
    if (newJoltage === 99) break; // hit max
    console.log({ joltage, newJoltage });
  }

  // console.log(joltage, '==>', ans);
  console.log(line);
  console.log(memo.join(''));

  ans += joltage;

  // try checking everything lmao

  // for (let i = 0; i < input.length; i++) {
  //   const line = input[i];

  //   let joltage = 99;

  //   while (joltage > 0) {
  //     const [first, second] = joltage.toString().split('');

  //     const firstPos = line.indexOf(first);
  //     const secondPos = line.lastIndexOf(second);
  //     if (firstPos < secondPos && firstPos !== -1 && secondPos !== -1) {
  //       ans += joltage;
  //       console.log(joltage, '--->', ans);
  //       break;
  //     }
  //     joltage--;
  //   }

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

console.log({ ans });

// test 357
// 17432 too low
