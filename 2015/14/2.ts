import fs from 'fs';

console.log('Advent of Code 2015/14');
const input = fs.readFileSync('./2015/14/input.txt', 'utf-8').split('\n');

let ans = 0;
const MAX = 2503;

type Reindeer = {
  name: string;
  speed: number;
  burst: number;
  rest: number;
  state: 'burst' | 'rest';
  timer: number;
  dist: number;
  points: number;
};

const reindeer: Reindeer[] = [];

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  const groups = line.match(
    /(?<name>\w+) can fly (?<speed>\d+) km\/s for (?<burst>\d+) seconds, but then must rest for (?<rest>\d+) seconds./
  )!.groups!;

  const [name, speed, burst, rest] = [
    groups.name,
    Number(groups.speed),
    Number(groups.burst),
    Number(groups.rest),
  ];

  // console.log({ name, speed, burst, rest });

  reindeer.push({
    name,
    speed,
    burst,
    rest,
    state: 'burst',
    timer: burst,
    dist: 0,
    points: 0,
  });
}

console.table(reindeer);

for (let i = 0; i < MAX; i++) {
  for (const r of reindeer) {
    if (r.state === 'burst') {
      r.dist += r.speed;
    }
    r.timer--;
    if (r.timer === 0) {
      r.state = r.state === 'burst' ? 'rest' : 'burst';
      r.timer = r[r.state];
    }
  }

  reindeer.sort((a, b) => b.dist - a.dist);
  const top = reindeer.filter((r) => r.dist === reindeer[0].dist);
  for (const r of top) r.points++;
  console.table(top);
}

console.table(reindeer);

console.log({ ans });
