require("dotenv").config();
const { DATABASE_URL, DEBUG } = process.env;
const fs = require("fs");
const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: {
        rejectUnauthorized: true,
        ca: fs
          .readFileSync(path.resolve(__dirname, "certificates", "ca.cert"))
          .toString(),
      },
    },
    pool: {
      min: 1,
      max: 5,
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
