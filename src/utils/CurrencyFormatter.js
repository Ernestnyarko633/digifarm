// currency formatter
export function formatDollar(num) {
  const p = Number(num).toFixed(2).split('.')
  return `$ ${p[0]
    .split('')
    .reverse()
    .reduce(function (acc, num, i, orig) {
      return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc
    }, '')}.${p[1]}`
}

export function currencyFormat(num) {
  return `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
}
