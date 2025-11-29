const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const secure = require("../../middleware/secure");
const {getUserWithId, getUserWithMail, putUserWhitId, deleteUserWhitId} = require("./user.query");

router.get("/user", auth, async (req, res) => {
  try {
    const result = await getUserWithId(req.payload.id);
    if (result.length === 0) {
      return res.json({ msg: "Not found" });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/users/:id", auth, /*secure({ checkIdMatch: true, checkEmailMatch: true }),*/ async (req, res) => {
    try {
      const id = req.params.id;  
      let result;
      if (id.includes("@")) {
        result = await getUserWithMail(id);
      } else {
        result = await getUserWithId(id);
      }
      if (result.length === 0) {
        return res.json({ msg: "Not found" });
      }
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

router.put("/users/:id", auth, /*secure({ checkIdMatch: true, checkEmailAlreadyUse: true }),*/ async (req, res) => {
    try {
      const id = req.params.id;
      const { email, password, name, firstname } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const result = await putUserWhitId(email, hashPassword, name, firstname, id);
      if (result.affectedRows === 0) {
        return res.json({ msg: "Not found" });
      }
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

router.delete("/users/:id", auth, /*secure({ checkIdMatch: true }),*/ async (req, res) => {
    try {
      const id = req.params.id;
      const result = await deleteUserWhitId(id);
      if (result.affectedRows === 0) {
        return res.json({ msg: "Not found" });
      }
      res.status(200).json({ msg: `Successfully deleted record number: ${id}` });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

module.exports = router;
