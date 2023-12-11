import { transpose } from './transpose';

describe('transpose', () => {
  it.each([
    {
      desc: 'square string matrix',
      input: [
        ['a', 'b'],
        ['c', 'd'],
      ],
      output: [
        ['a', 'c'],
        ['b', 'd'],
      ],
    },
    {
      desc: 'rectangle string matrix',
      input: [
        ['a', 'b', 'x'],
        ['c', 'd', 'y'],
      ],
      output: [
        ['a', 'c'],
        ['b', 'd'],
        ['x', 'y'],
      ],
    },
    // {
    //   desc: 'rectangle mixed matrix',
    //   input: [
    //     ['a', 1, { a: 'b' }],
    //     [[1], true, null],
    //   ],
    //   output: [
    //     ['a', [1]],
    //     [1, true],
    //     [{ a: 'b' }, null],
    //   ],
    // },
  ])('should transpose $desc', ({ input, output }) => {
    expect(transpose(input)).toMatchObject(output);
  });
});
