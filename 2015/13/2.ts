import fs from 'fs';

console.log('Advent of Code 2015/13');
const input = fs.readFileSync('./2015/13/input.txt', 'utf-8').split('\n');

let ans = 0;

const me = 'Me';
const people: string[] = [me];
const neighbour: Record<string, Record<string, number>> = {};

for (let i = 0; i < input.length; i++) {
  const line = input[i].replace('.', '');
  const [personWould, nextTo] = line.split(
    ' happiness units by sitting next to '
  );
  const [person, gainOrLose] = personWould.split(' would ');
  if (!people.includes(person)) people.push(person);
  if (!people.includes(nextTo)) people.push(nextTo);

  const [gainLose, units] = gainOrLose.split(' ');
  if (!neighbour[person]) neighbour[person] = {};
  if (gainLose === 'gain') {
    neighbour[person][nextTo] = Number(units);
  } else {
    neighbour[person][nextTo] = -Number(units);
  }
}

console.log(neighbour);

const totalHappiness = (arr: string[]) => {
  let score = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    const L = arr[i],
      R = arr[i + 1];
    score += neighbour[L][R] + neighbour[R][L];
  }
  score += neighbour[arr[0]][arr.at(-1)!] + neighbour[arr.at(-1)!][arr[0]];
  return score;
};

const dfs = (arr: string[] = []) => {
  if (arr.length === people.length) {
    const score = totalHappiness(arr);
    if (score > ans) console.log({ arr, score, ans });
    ans = Math.max(ans, score);

    return;
  }
  for (const next of people) {
    if (arr.includes(next)) continue;
    arr.push(next);
    dfs(arr);
    arr.pop();
  }
};

neighbour[me] = {};

for (const next of people) {
  neighbour[next][me] = 0;
  neighbour[me][next] = 0;
}

dfs();

console.log({ ans });
