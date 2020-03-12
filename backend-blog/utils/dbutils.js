const utils = require('./utils')
const dateUtils = require('./dateUtils')
const { isEmpty } = require('./validation')

const setDataIntoOneString = (rows, keys) => {
  var result = rows[0]
  for (let i = 1; i < rows.length; i++) {
    keys.map(e => {
      result[e] += ',' + rows[i][e]
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

const division2Level = (rows, keys) => {
  const result = []
  let i = -1,
    temp_id = -1 // root_id

  rows.map(e => {
    if (temp_id !== e[keys[0]]) { // root_id change
      i++
      temp_id = e[keys[0]] // set root_id to temp_id
      keys.map(key => { // add new element to result
        if (!result[i]) {
          result[i] = {} // constructor
        }
        result[i][key] = e[key]
      })
    }

    keys.map(key => delete e[key]) // delete root key
    if (!result[i].childs) {
      result[i].childs = [] // constructor
    }
    result[i].childs.push(e) // add object to child array
  })
  return result
}

const makeQueryFilter = (variables) => {
  let result = {
    query: 'WHERE ',
    values: [],
    count: 0
  }
  let count = 1
  try {
    for (key in variables) {
      let e = variables[key]
      if (e !== null && e !== undefined) {
        if (utils.isObject(variables[key])) {
          if (!isEmpty(e.start)) {
            const start = dateUtils.changeDate(e.start, dateUtils.MMDDYYYY, dateUtils.YYYYMMDD)
            result.query += key + ` >= $${count++} AND `
            result.values[count - 2] = start ? start : e.start
          }
          if (!isEmpty(e.end)) {
            const end = dateUtils.changeDate(e.end, dateUtils.MMDDYYYY, dateUtils.YYYYMMDD)
            result.query += key + ` <= $${count++} AND `
            result.values[count - 2] = end ? end : e.end
          }
        } else if ((utils.isNumber(e) && e !== 0) || utils.isString(e) && e !== '') {
          result.query += key + ` = $${count++} AND `
          result.values[count - 2] = e
        } else if (utils.isBoolean(e)) {
          result.query += key + ` = $${count++} AND `
          result.values[count - 2] = e
        }
      }
    }
    result.query = result.query.substring(0, result.query.lastIndexOf('AND'))
    result.count = count
    return result
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  setDataIntoOneString,
  getPropertyValue,
  division2Level,
  makeQueryFilter
}