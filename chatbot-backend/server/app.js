import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import i18n, { __ } from 'i18n';
import mongoose from 'mongoose';
import logger from 'morgan';
import config from './config';
import routes from './routes';
import httpContext from 'express-http-context';
import expressFileUpload from 'express-fileupload';

const port = config.server.port;
const app = express();
const server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressFileUpload());
app.use(cors());
app.use(i18n.init);
app.use(httpContext.middleware);

i18n.configure({
  locales: ['en', 'de', 'ar'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
});

const connectionStr = `${config.database.db_uri}/${config.database.db_name}`;
mongoose
  .connect(connectionStr, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(err => console.log(err.reason));
const db = mongoose.connection;
db.on('error', err => {
  console.error('> Error occurred from the database');
  console.error(err);
});
db.once('open', () => {
  console.log('> Connected to database successfully');
});
app.get("/favicon.ico", (req, res) => res.status(204));
routes(app);
// Error handlers
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const code = err.code || 500;
  console.log(err.message);

  if (code === 500) {
    err.message = 'Internal server error.';
  }
  res.status(code).send(err);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
