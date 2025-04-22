const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.story = require("./story.model");
db.tag = require("./tag.model");

db.TAGS = [
  "kindness",
  "career",
  "love",
  "family",
  "life",
  "friendship",
  "growth",
  "inspiration",
  "gratitude",
];

module.exports = db;
