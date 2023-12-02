import fs from 'fs';

console.log('Advent of Code 2023/02');
const input = fs.readFileSync('./2023/02/input.txt', 'utf-8').split('\n');

let ans = 0;
const max: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  const [gameLabel, games] = line.split(':');

  const gameId = Number(gameLabel.split(' ')[1]);
  let valid = true;

  const rounds = games.split(';');
  for (const round of rounds) {
    const colours = round.split(',');
    for (const draw of colours) {
      const [num, col] = draw.trim().split(' ');
      if (max[col] < Number(num)) {
        valid = false;
        break;
      }
    }
    if (!valid) break;
  }
  if (valid) ans += gameId;
}

console.log({ ans });
