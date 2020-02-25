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


module.exports = {
  setDataIntoOneString,
  getPropertyValue,
  division2Level
}