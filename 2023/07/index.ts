import fs from 'fs';

console.log('Advent of Code 2023/07');
const input = fs.readFileSync('./2023/07/input.txt', 'utf-8').split('\n');

const mapCards = (cards: string) => {
  return cards.split('').map((card) => {
    switch (card) {
      case 'A':
        return 14;
      case 'K':
        return 13;
      case 'Q':
        return 12;
      case 'J':
        return 11;
      case 'T':
        return 10;
      default:
        return Number(card);
    }
  });
};

const scoreCards = (cards: number[]) => {
  let score: Record<number, number> = {};
  for (const letter of cards) {
    if (!score[letter]) score[letter] = 0;
    score[letter]++;
  }
  const count = Object.values<number>(score);

  switch (count.length) {
    case 1: // five of a kind
      return 6;
    case 2:
      if (count.includes(4)) return 5; // 4 of a kind
      else return 4; // full house
    case 3:
      if (count.includes(3)) return 3; // 3 of a kind
      else return 2; // two pairs
    case 4:
      return 1; // one pair
    default:
      return 0; // high card
  }
};

const sortCards = (
  cardA: [number[], number, number],
  cardB: [number[], number, number]
) => {
  const A = [cardA[2], ...cardA[0]];
  const B = [cardB[2], ...cardB[0]];
  for (let i = 0; i < A.length; i++) {
    if (A[i] === B[i]) continue;
    return A[i] - B[i];
  }
  return 0;
};

const cardList: [number[], number, number, string][] = [];

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  const [cards, bid] = line.split(' ');
  const cardMap = mapCards(cards);

  cardList.push([cardMap, Number(bid), scoreCards(cardMap), cards]);

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

cardList.sort(sortCards);

let ans = 0;

for (let i = 0; i < cardList.length; i++) {
  ans += cardList[i][1] * (i + 1);
  console.log([ans, ...cardList[i], i + 1].reverse());
}

console.log({ ans });
