const utils = require('./utils')
const dateUtils = require('./dateUtils')

const setDataIntoOneString = (rows, keys) => {
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

const division2Level = (rows, keys) => {
  const result = []
  let i = -1, temp_id = -1 // root_id
  
  rows.map(e => {
    if (temp_id !== e[keys[0]]) { // root_id change
      i++ 
      temp_id = e[keys[0]] // set root_id to temp_id
      keys.map(key => {    // add new element to result
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
    values: []
  }
  let count = 1
  try{
    for(key in variables) {
      if(variables[key] !== null && variables !== undefined) {
        if(utils.isObject(variables[key]) && variables[key]['start'] && variables[key]['end']) {
          const start = dateUtils.changeDate(variables[key].start, dateUtils.DDMMYYY, dateUtils.YYYYMMDD)
          const end = dateUtils.changeDate(variables[key].end, dateUtils.DDMMYYY, dateUtils.YYYYMMDD)
          result.query += key + ` BETWEEN $${count++} AND $${count++} AND`
          result.values[count - 3] = start ? start : variables[key]['start']
          result.values[count - 2] = end ? end : variables[key]['end']
        }
      }
      console.log(result)
    }
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