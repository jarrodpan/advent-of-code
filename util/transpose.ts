export const transpose = <T extends any>(m: T[][]) => {
  const output = [];
  for (let i = 0; i < m[0].length; i++) {
    const newRow = [];
    for (let j = 0; j < m.length; j++) {
      newRow.push(m[j][i]);
    }
    output.push(newRow);
  }
  return output as unknown as T[][];
};
