const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
prisma
  .$connect()
  .then(() => {
    console.log("MongoDb connect successfully.");
    const express = require("express");
    const bodyParser = require("body-parser");
    const cors = require("cors");
    const cookieParser = require("cookie-parser");
    const session = require("express-session");
    require("dotenv").config();

    const taskRoute = require("./routes/task_routes");

    const app = express();
    const corsOptions = {
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          // callback(new error("Not allowed by CORS"));
          callback("Not allowed by CORS");
        }
      },
      credentials: true,
    };
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
    app.use(
      session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );
    app.use("/tasks", taskRoute);

    app.listen(process.env.PORT, () => {
      console.log(
        `prisma-expressjs-mongo-api-CRUD server is running on port: ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
