const db = require("../models");
const Story = db.story;

exports.getAllStories = (req, res) => {
  Story.find({}, (err, stories) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(stories);
  });
};

exports.addStory = (req, res) => {
  if (!req.body.title) {
    res.send({ status: "error", message: "Title cannot be empty!" });
    return;
  }
  if (!req.body.content) {
    res.send({ status: "error", message: "Content cannot be empty!" });
    return;
  }
  if (!req.body.tag) {
    res.send({ status: "error", message: "Tag cannot be empty!" });
    return;
  }

  const story = new Story({
    title: req.body.title,
    content: req.body.content,
    tag: req.body.tag,
  });
  story.save((err, story) => {
    if (err) {
      res.send({ status: "error", message: err });
      return;
    }

    res.send({
      ...story.toObject(),
      status: "success",
      message: "Story was registered successfully!",
    });
  });
};

exports.deleteStory = (req, res) => {
  const _id = req.body.storyId;
  Story.findByIdAndRemove(_id, (err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ status: "success", message: "Story was deleted successfully!" });
  });
};
