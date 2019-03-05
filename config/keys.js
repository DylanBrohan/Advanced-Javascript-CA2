// Just for setting up Keys to protect the database information
// Production & Developement keys
if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}
