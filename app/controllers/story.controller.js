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
  const story = new Story({
    title: req.body.title,
    content: req.body.content,
    tag: req.body.tag,
  });
  story.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Story was registered successfully!" });
  });
};

exports.deleteStory = (req, res) => {
  const _id = req.body.id;
  Story.findByIdAndRemove(_id, (err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Story was deleted successfully!" });
  });
};
