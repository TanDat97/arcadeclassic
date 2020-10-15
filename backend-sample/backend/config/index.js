import path from "path";
import dotenv from "dotenv";

const __dirname = path.resolve();
dotenv.config({
  path: path.join(__dirname, ".env"),
  silent: process.env.NODE_ENV === "production",
});

export default {
  mongo: {
    uri: process.env.MONGO_URI,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    db: process.env.MONGO_DB,
    auth: {
      authdb: "admin",
    },
    useNewUrlParser: true,
  },
};
