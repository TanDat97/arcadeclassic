const successMessage = ((msg, data) => {
  return {
    status: 200,
    message: msg,
    data: data
  };
})
const errorMessage = ((msg, code) => {
  return {
    status: code,
    message: msg
  };
})

const status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  conflict: 409,
  created: 201,
  bad: 400,
  nocontent: 204,
};

const trip_statuses = {
  active: 1.00,
  cancelled: 2.00,
}

module.exports = {
  successMessage,
  errorMessage,
  status,
  trip_statuses,
};