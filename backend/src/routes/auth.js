const config = require("config");
const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../database/models/User");
const auth = require("../middleware/Auth/auth");
const { InvalidCredentials } = require("../utils/error-messages/AuthErrors");
const { ServerError } = require("../utils/error-messages/ServerErrors");
const { errorFactory } = require("../utils/error/errorFactory");

const router = express.Router();

// @route GET api/auth
// @desc authenticate user with token
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(errorFactory(ServerError));
  }
});

// @route POST /auth/
// @desc Login user
// @access Public

router.post(
  "/",
  [
    check("email", "Inclua um email válido").isEmail(),
    check("password", "Inclua uma senha").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json(errorFactory(InvalidCredentials));
      }

      if (user.password !== password) {
        return res.status(400).json(errorFactory(InvalidCredentials));
      }

      const payload = {
        user: { id: user.id, is_admin: user.is_admin },
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
