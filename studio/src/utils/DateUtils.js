const moment = require('moment')

const DDMMYYYY = 'DD/MM/YYYY'
const DDMMYYYYhhmm = 'DD/MM/YYYY hh:mm'
const MMDDYYYY = 'MM/DD/YYYY'
const YYYYMMDD = 'YYYY/MM/DD'

const changeDateFormat = (arg, fmOutput) => {
  const result = moment(arg).format(fmOutput)
  return result.toLocaleLowerCase().includes('invalid') ? arg : result
}

const changeDate = (arg, fmInput, fmOutput) => {
  let result = moment(arg, fmInput).format(fmOutput)
  return result.toLocaleLowerCase().includes('invalid') ? arg : result
}

module.exports = {
  DDMMYYYY,
  DDMMYYYYhhmm,
  MMDDYYYY,
  YYYYMMDD,
  changeDateFormat,
  changeDate,
}