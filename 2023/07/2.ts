import fs from 'fs';

console.log('Advent of Code 2023/07');
const input = fs.readFileSync('./2023/07/input.txt', 'utf-8').split('\n');

const cardStringToList = (cards: string) => {
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

enum Hand {
  FiveOfAKind = 6,
  FourOfAKind = 5,
  FullHouse = 4,
  ThreeOfAKind = 3,
  TwoPairs = 2,
  OnePair = 1,
  HighCard = 0,
}

const scoreCardList = (cards: number[]) => {
  let score: Record<number, number> = {};
  for (const letter of cards) {
    if (!score[letter]) score[letter] = 0;
    score[letter]++;
  }
  const count = Object.values<number>(score);

  switch (count.length) {
    case 1: // five of a kind
      return Hand.FiveOfAKind;
    case 2:
      if (count.includes(4)) return Hand.FourOfAKind; // 4 of a kind
      else return Hand.FullHouse; // full house
    case 3:
      if (count.includes(3)) return Hand.ThreeOfAKind; // 3 of a kind
      else return Hand.TwoPairs; // two pairs
    case 4:
      return Hand.OnePair; // one pair
    default:
      return Hand.HighCard; // high card
  }
};

//248108248 too low
//
//249702323 too high
//249722254 too high
//249910467 too high

const scoreCardListWithJokers = (cards: number[]) => {
  const jokers = cards.filter((x) => x === 11).length;
  const otherCards = cards.filter((x) => x !== 11);
  let maxScore = scoreCardList(cards);
  if (maxScore === Hand.FiveOfAKind) return Hand.FiveOfAKind;

  console.log('original:', cards);

  switch (jokers) {
    case 5:
    case 4:
      return Hand.FiveOfAKind;
    case 3:
      if (otherCards[0] === otherCards[1]) return Hand.FiveOfAKind;
      else return Hand.FourOfAKind;
    case 2:
      if (otherCards[0] === otherCards[1] && otherCards[1] === otherCards[2])
        return Hand.FiveOfAKind;
      if (otherCards[0] === otherCards[1] || otherCards[1] === otherCards[2])
        return Hand.FourOfAKind;
      else return Hand.ThreeOfAKind;
    case 1:
      for (let i of new Set(otherCards)) {
        maxScore = Math.max(maxScore, scoreCardList([i, ...otherCards]));
        console.log([i, ...otherCards], maxScore);
        if (maxScore === Hand.FiveOfAKind) return Hand.FiveOfAKind;
      }
      return maxScore;
    case 0:
    default:
      break;
  }
  return maxScore;
};

const sortCardLists = (
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
  const cardMap = cardStringToList(cards);

  cardList.push([
    cardMap,
    Number(bid),
    scoreCardListWithJokers(cardMap),
    cards,
  ]);

  // const groups = line.match(/(?<aaaaa>\w+)(?<bbbbb>\d+)/)!.groups!;
}

cardList.sort(sortCardLists);

let ans = 0;

for (let i = 0; i < cardList.length; i++) {
  ans += cardList[i][1] * (i + 1);
  console.log([ans, ...cardList[i], i + 1].reverse());
}

console.log({ ans });
