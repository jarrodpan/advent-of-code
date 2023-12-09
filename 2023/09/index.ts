import fs from 'fs';

console.log('Advent of Code 2023/09');
const input = fs.readFileSync('./2023/09/input.txt', 'utf-8').split('\n');

let ans = 0;

for (let i = 0; i < input.length; i++) {
  const line = input[i].split(' ').map(Number);

  const lists = [line];
  while (!lists.at(-1)!.every((x) => x === 0)) {
    const newList = [];
    const lastList = lists.at(-1)!;
    for (let i = 1; i < lastList.length; i++) {
      newList.push(lastList[i] - lastList[i - 1]);
    }
    lists.push(newList);
  }

  lists.at(-1)!.push(0);

  for (let i = lists.length - 2; i >= 0; i--) {
    lists[i].push(lists[i].at(-1)! + lists[i + 1].at(-1)!);
  }

  const next = lists[0].at(-1)!;
  ans += next;

  console.log({ next, ans });

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

console.log({ ans });
