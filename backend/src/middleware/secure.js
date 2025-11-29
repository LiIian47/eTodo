const db = require("../config/db");

function secure({
  lock = false,
  checkIdMatch = false,
  checkEmailMatch = false,
  checkEmailAlreadyUse = false,
  checkTodoUserId = false,
} = {}) {
  return async (req, res, next) => {
    const conn = await db;
    const email = req.body.email;
    const param = req.params.id;
    if (lock) {
      return res.status(403).json({ msg: "route locked" });
    }
    if (checkIdMatch && !param.includes("@") && req.payload.id != param) {
      return res.status(403).json({
        msg: "route not allowed (Id mismatch)",
      });
    }
    if (checkEmailMatch && param.includes("@") && req.payload.email != param) {
      return res.status(403).json({
        msg: "route not allowed (Email mismatch)",
      });
    }
    if (checkEmailAlreadyUse) {
      const [userActualEmail] = await conn.query(
        "SELECT email FROM user WHERE id = ?",
        [param]
      );
      if (userActualEmail[0].email !== email) {
        const [allUserEmail] = await conn.query(
          "SELECT id FROM user WHERE email = ?",
          [email]
        );
        if (allUserEmail.length > 0) {
          return res.status(409).json({ msg: "Email already used" });
        }
      }
    }
    if (checkTodoUserId) {
      const [result] = await conn.query(`SELECT * FROM todo WHERE id = ?;`, [
        param,
      ]);
      if (result.length === 0) {
        return res.status(404).json({ msg: "Todo not found" });
      }
      if (result[0].user_id !== req.payload.id) {
        return res.status(400).json({ msg: "Not allowed to access this todo" });
      }
    }
    next();
  };
}

module.exports = secure;
