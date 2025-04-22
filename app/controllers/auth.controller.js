require("dotenv").config();
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const db = require("../models");
const Admin = db.admin;

var jwt = require("jsonwebtoken");

exports.signin = (req, res) => {
  Admin.findOne(
    {
      userRole: "admin",
    },
    (err, user) => {
      if (err) {
        res.send({ status: "error", accessToken: null, message: err });
        return;
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.send({
          status: "error",
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user._id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        status: "success",
        accessToken: token,
        message: "You are successfully logged in!",
      });
    }
  );
};

exports.updatePassword = (req, res) => {
  Admin.findOne({ userRole: "admin" }, (err, user) => {
    if (err) {
      return res.send({ status: "error", message: err });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.currentPassword,
      user.password
    );

    if (!passwordIsValid) {
      return res.send({ status: "error", message: "Invalid Password!" });
    }

    const newHashedPassword = bcrypt.hashSync(req.body.newPassword, 8);

    Admin.updateOne(
      { userRole: "admin" },
      { password: newHashedPassword },
      (err, result) => {
        if (err) {
          return res.send({ status: "error", message: err });
        }
        if (result.nModified === 0) {
          return res.send({
            status: "error",
            message: "User not found or password not updated!",
          });
        }

        return res.status(200).send({
          status: "success",
          message: "Password updated successfully!",
        });
      }
    );
  });
};
