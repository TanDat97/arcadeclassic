const setDataIntoOne = (rows, keys) => {
  var result = rows[0]
  for(let i = 1; i < rows.length; i++) {
    keys.map(e => {
      result[e] += ','+rows[i][e]
    })
  }
  return result
}

const getPropertyValue = (rows, keys) => {
  const result = {}
  keys.map(e => result[e] = rows[0][e])
  rows.map(item => {
    keys.map(e => delete item[e])
  })
  return result
}

module.exports = {
  setDataIntoOne,
  getPropertyValue
}