import fs from 'fs';

console.log('Advent of Code 2015/12');
const input = fs.readFileSync('./2015/12/input.txt', 'utf-8').split('\n');

var parseArray = (s: any[]) => {
  let sum = 0;
  for (const v of s) {
    switch (true) {
      case Array.isArray(v):
        sum += parseArray(v);
        break;
      case typeof v === 'number':
        sum += v;
        break;
      case typeof v === 'string':
        break;
      case typeof v === 'object':
      default:
        sum += parseObject(v);
    }
  }
  return sum;
};

var parseObject = (s: object) => {
  if (Array.isArray(s)) return parseArray(s);
  let sum = 0;
  for (const [key, v] of Object.entries(s)) {
    switch (true) {
      case key === 'red':
      case v === 'red':
        return 0;
      case Array.isArray(v):
        sum += parseArray(v);
        break;
      case typeof v === 'number':
        sum += v;
        break;
      case typeof v === 'string':
        break;
      case typeof v === 'object':
      default:
        sum += parseObject(v);
    }
  }
  return sum;
};

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  const obj = JSON.parse(line);
  console.log({ in: line.substring(0, 10), out: parseObject(obj) });
  // console.log(JSON.stringify(obj, undefined, 2));
}
