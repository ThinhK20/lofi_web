const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

const authRouter = require("./routes/authRouter");
const imageRouter = require("./routes/imageRouter");
const videoRouter = require("./routes/videoRouter");
const audioRouter = require("./routes/audioRouter");
const emailRouter = require("./routes/emailRouter");
const googleRouter = require("./routes/googleRouter");
const userRouter = require("./routes/userRouter");
const NotFoundMiddleware = require("./middlewares/NotFoundMiddleware");
const errorHandlerMiddleware = require("./middlewares/ErrorHandlerMiddleware");

dotenv.config();
const app = express();

app.use(
   cors({
      origin: [
         "https://lofi-chill-api.onrender.com",
         "http://localhost:9024",
         "http://localhost:8000",
         "http://localhost:3000",
         "https://lofi-aecm3p2v7-thinhk20.vercel.app/",
      ],
   })
);

app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
   session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
   })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/v1/auth", authRouter);
app.use("/v1/image", imageRouter);
app.use("/v1/video", videoRouter);
app.use("/v1/audio", audioRouter);
app.use("/v1/email", emailRouter);
app.use("/v1/auth/google", googleRouter);
app.use("/v1/user", userRouter);

app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URI, () => {
         console.log("Connected to database");
         const port = process.env.PORT || 8000;
         app.listen(port, () => {
            console.log("Server is running at http://localhost:" + port);
         });
      });
   } catch (err) {
      console.log(err);
   }
};

startServer();
