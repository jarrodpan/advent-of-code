import fs from 'fs';

console.log('Advent of Code 2015/09');
const input = fs.readFileSync('./2015/09/input.txt', 'utf-8').split('\n');

let ans = Infinity;

let map: Record<string, { to: string; dist: number }[]> = {};

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  const [path, dist] = line.split(' = ');
  const [from, to] = path.split(' to ');
  if (!map[from]) map[from] = [];
  if (!map[to]) map[to] = [];
  map[from].push({ to, dist: Number(dist) });
  map[to].push({ to: from, dist: Number(dist) });
}

const cities = Object.keys(map);
const numCities = cities.length;

const dfs = (node: string, path: string[] = [], dist: number = 0) => {
  if (dist > ans) return;
  if (path.length === numCities) {
    console.log({ path, dist, ans });
    ans = Math.min(ans, dist);
    return;
  }

  const dests = map[node];
  for (const next of dests) {
    if (path.includes(next.to)) continue;
    path.push(next.to);
    dfs(next.to, path, dist + next.dist);
    path.pop();
  }
};

console.table(map);

for (const city of cities) {
  dfs(city, [city]);
}

console.log({ ans });
