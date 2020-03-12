const moment = require('moment')

const DDMMYYYY = 'DD/MM/YYYY'
const DDMMYYYYhhmm = 'DD/MM/YYYY hh:mm'
const MMDDYYYY = 'MM/DD/YYYY'
const YYYYMMDD = 'YYYY/MM/DD'

const changeDate = (arg, fmInput, fmOutput) => {
  let result = moment(arg, fmInput).format(fmOutput)
  return result.toLocaleLowerCase().includes('invalid') ? null : result
}

module.exports = {
  DDMMYYYY,
  DDMMYYYYhhmm,
  MMDDYYYY,
  YYYYMMDD,
  changeDate,
}