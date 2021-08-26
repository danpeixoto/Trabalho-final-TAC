const config = require("config");
const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../database/models/User");
const { ServerError } = require("../utils/error-messages/ServerErrors");
const { UserExists } = require("../utils/error-messages/UserErros");
const { errorFactory } = require("../utils/error/errorFactory");

const router = express.Router();

//@route POST /user/
// @desc Create new user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, password, email } = req.body;
    try {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json(errorFactory(UserExists));
      }

      const newUser = await User.create({
        name,
        email,
        password,
        is_admin: "no",
      });

      const payload = {
        user: { id: newUser.id, is_admin: newUser.is_admin },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
          });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json(errorFactory(ServerError));
    }
  },
);

module.exports = router;
