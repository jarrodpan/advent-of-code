import fs from 'fs';

console.log('Advent of Code 2015/14');
const input = fs.readFileSync('./2015/15/input.txt', 'utf-8').split('\n');

let ans = 0;

const ing: {
  c: number;
  d: number;
  f: number;
  t: number;
  [key: string]: any;
}[] = [];

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  const groups = line.match(
    /(?<ing>\w+): capacity (?<c>[0-9\-]+), durability (?<d>[0-9\-]+), flavor (?<f>[0-9\-]+), texture (?<t>[0-9\-]+), calories (?<cal>[0-9]+)/
  )!.groups!;

  const ingredient = {
    ...groups,
    c: Number(groups.c),
    d: Number(groups.d),
    f: Number(groups.f),
    t: Number(groups.t),
    cal: Number(groups.cal),
  };

  ing.push(ingredient);
}

const combos = (d: number, sum: number, x: number[]) => {
  if (sum > 100) return;
  if (d === ing.length) {
    if (sum < 100) return;
    const spoons = ing.map(({ c, d, f, t }, n) => [
      c * x[n],
      d * x[n],
      f * x[n],
      t * x[n],
    ]);

    const combined = spoons.reduce((row1, row2) => {
      let out = [];
      for (let i = 0; i < row1.length; i++) {
        const sum = row1[i] + row2[i];
        out.push(sum);
      }
      return out;
    });

    const score = combined.reduce((x, y) => {
      if (x < 0 || y < 0) return 0;
      return x * y;
    }, 1);

    if (score > ans) {
      console.log({ x, spoons, combined, score, ans });
      ans = score;
    }
    return;
  }
  for (let i = 0; i <= 100; i++) {
    x[d] = i;
    combos(d + 1, sum + i, x);
  }
};

combos(0, 0, new Array(ing.length).fill(0));

console.log(ing);

console.log({ ans });
