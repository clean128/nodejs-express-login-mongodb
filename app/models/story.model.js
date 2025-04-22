const mongoose = require("mongoose");

const Story = mongoose.model(
  "Story",
  new mongoose.Schema({
    title: String,
    content: String,
    tag: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = Story;
