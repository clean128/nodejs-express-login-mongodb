const controller = require("../controllers/story.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/story/list", controller.getAllStories);

  app.post("/api/story/add", controller.addStory);

  app.post("/api/story/delete", controller.deleteStory);
};
