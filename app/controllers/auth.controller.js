require("dotenv").config();
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");

exports.signin = (req, res) => {
  if (req.body.password !== process.env.PASSWORD) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }

  const token = jwt.sign({ id: "admin" }, config.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400, // 24 hours
  });

  req.session.token = token;

  return res.status(200).send({
    accessToken: token,
    message: "You've been signed in!",
  });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
