const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.story = require("./story.model");
db.admin = require("./admin.model");

module.exports = db;
