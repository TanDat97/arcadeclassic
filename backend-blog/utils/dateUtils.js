const moment = require('moment')

const DDMMYYY = 'DD/MM/YYYY'
const YYYYMMDD = 'YYYY/MM/DD'

const changeDate = (arg, fmInput, fmOutput) => {
  let result = moment(arg, fmInput).format(fmOutput)
  return result.toLocaleLowerCase().includes('invalid') ? null : result
}

module.exports = {
  DDMMYYY,
  YYYYMMDD,
  changeDate,
}