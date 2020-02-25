const successMessage = new Object ({
  status: 200,
  message: 'success'
});
const errorMessage = new Object ({
  status: 500,
  error_code: 0,
  message: 'error' 
});
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