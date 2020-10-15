import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import sessions from "express-session";
import bodyParser from "body-parser";
import cors from "cors";

import mongoose from "mongoose";
import config from "./config/index.js";

const app = express();
const __dirname = path.resolve();

const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["authorization"],
};

app.use(cors(corsOption));

app.use(
  sessions({
    secret: "(!)*#(!JE)WJEqw09ej12",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

const connectionStr = `${config.mongo.uri}/${config.mongo.db}`;
mongoose
  .connect(connectionStr, {
    authSource: "admin",
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(JSON.stringify(err.reason)));

const db = mongoose.connection;
db.on("error", (err) => {
  console.error("Error occurred from the database" + JSON.stringify(err));
});
db.once("open", () => {
  console.log("Connected to database successfully");
});

import indexRouter from "./routes/index.js";

app.get("/favicon.ico", (req, res) => res.status(204));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
