const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0,
};

before((done) => {
  mongoose.connect(process.env.MONGO_URI_TEST,options);
  mongoose.connection
    .once("open", () => {
      console.log("connected to db test");
      done();
    })
    .on("error", (err) => {
      console.warn("warning", err);
    });
});
