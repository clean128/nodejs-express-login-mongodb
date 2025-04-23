const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const dbConfig = require("./app/config/db.config");

const app = express();

app.use(cors());
/* for Angular Client (withCredentials) */
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:8081"],
//   })
// );

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Admin = db.admin;

db.mongoose
  .connect(dbConfig.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to story application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/story.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Admin.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Admin({
        userRole: "admin",
        password: bcrypt.hashSync("admin123", 8),
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin123' as password to admin collection");
      });
    }
  });
}
