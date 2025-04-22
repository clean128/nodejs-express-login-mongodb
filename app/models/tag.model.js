const mongoose = require("mongoose");

const Tag = mongoose.model(
  "Tag",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = Tag;
