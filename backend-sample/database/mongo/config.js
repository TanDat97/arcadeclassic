const url = 'mongodb://mongo:27017/symphony?retryWrites=true'
const options = {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    auth: {
        authdb: 'admin'
    },
    useNewUrlParser: true,
}

module.exports = {
  url,
  options
}