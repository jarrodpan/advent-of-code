import fs from 'fs';

console.log('Advent of Code 2015/14');
const input = fs.readFileSync('./2015/14/input.txt', 'utf-8').split('\n');

let ans = 0;
const MAX = 2503;

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  const groups = line.match(
    /(?<reindeer>[A-Za-z]+) can fly (?<speed>\d+) km\/s for (?<time>\d+) seconds, but then must rest for (?<rest>\d+) seconds./
  )!.groups!;

  const [reindeer, speed, time, rest] = [
    groups.reindeer,
    Number(groups.speed),
    Number(groups.time),
    Number(groups.rest),
  ];

  console.log({ reindeer, speed, time, rest });

  let seconds = 0;
  let dist = 0;
  while (seconds < MAX) {
    if (seconds + time < MAX) {
      seconds += time;
      dist += time * speed;
    } else {
      const part = MAX - seconds;
      dist += part * speed;
    }
    seconds += rest;
  }
  console.log({ reindeer, seconds, dist });
  ans = Math.max(ans, dist);
}

console.log({ ans });
