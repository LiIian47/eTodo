const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Bad parameter" });
    }

    const conn = await db;
    const [rows] = await conn.query(
      `SELECT id, email, password FROM user WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const payload = { email: user.email, id: user.id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token: accessToken });

  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});


router.post("/register", async (req, res) => {
  try {
    const conn = await db;
    const { email, password, name, firstname } = req.body;

    if (!email || !password || !name || !firstname) {
      return res.status(400).json({ msg: "Bad parameter" });
    }

    const [existingUser] = await conn.query(
      "SELECT id FROM user WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ msg: "Account already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const [result] = await conn.query(
      "INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)",
      [email, hashPassword, name, firstname]
    );

    const payload = { email: email, id: result.insertId };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ token: accessToken });

  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
