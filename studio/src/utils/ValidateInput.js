const ValidateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var validate = re.test(String(email).toLowerCase())
  return {
    validate: validate,
    message: validate ? '' : 'Email is invalid'
  }
}

const ValidatePassword = (password) => {
  var re = /^((?=.*\d)(?=.*[a-z])[0-9a-zA-Z[^!-/:-@[-\]^\\_`{-~]{8,20})$/;
  var validate = re.test(String(password))
  return {
    validate: validate,
    message: validate ? '' : 'Password must have one character, one number. Length in [8, 20]',
  }
}

export default {
  ValidateEmail,
  ValidatePassword
}