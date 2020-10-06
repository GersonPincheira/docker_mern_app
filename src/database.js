//database.js
const mongoose = require("mongoose");

// mongoose options
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0,
};

// mongodb environment variables
const { MONGO_URI, NODE_ENV } = process.env;
if (NODE_ENV !== "test") {
  const dbConnectionURL = {
    LOCALURL: MONGO_URI,
  };
  mongoose.connect(dbConnectionURL.LOCALURL, options);
  const db = mongoose.connection;
  db.on(
    "error",
    console.error.bind(
      console,
      "Mongodb Connection Error:" + dbConnectionURL.LOCALURL
    )
  );
  db.once("open", () => {
    // we're connected !
    console.log("Mongodb Connection Successful");
  });
}
