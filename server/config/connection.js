const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin:password12345@caseywoodmanatlas.oyfzt1f.mongodb.net/trip?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
