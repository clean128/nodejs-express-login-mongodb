const mongoose = require("mongoose");

const Story = mongoose.model(
  "Story",
  new mongoose.Schema({
    title: String,
    content: String,
    // tag: String,
    tag: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  })
);

module.exports = Story;
