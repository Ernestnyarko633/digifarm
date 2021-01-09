// currency formatter
export function formatDollar(num) {
  const p = Number(num).toFixed(2).split('.')
  return `$ ${p[0]
    .split('')
    .reverse()
    .reduce(function (acc, numb, i, orig) {
      return numb === '-' ? acc : numb + (i && !(i % 3) ? ',' : '') + acc
    }, '')}.${p[1]}`
}


