import fs from 'fs';

console.log('Advent of Code 2023/02');
const input = fs.readFileSync('./2023/02/input.txt', 'utf-8').split('\n');

let ans = 0;

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  const [gameLabel, games] = line.split(':');

  const gameId = Number(gameLabel.split(' ')[1]);
  let valid = true;

  const game: Record<string, number> = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const rounds = games.split(';');
  for (const round of rounds) {
    const colours = round.split(',');
    for (const draw of colours) {
      const [num, col] = draw.trim().split(' ');
      game[col] = Math.max(game[col], Number(num));
    }
  }
  console.log(game);
  ans += game.red * game.green * game.blue;
}

console.log({ ans });
