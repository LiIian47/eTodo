const db = require("../../config/db");

async function getUserWithMail(email) {
  try {
    const conn = await db;
    const [result] = await conn.query(
      `SELECT id , email, password, created_at, firstname, name FROM user WHERE email = ?;`,
      [email]
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getUserWithId(id) {
  try {
    const conn = await db;
    const [result] = await conn.query(
      `SELECT id , email, password, created_at, firstname, name FROM user WHERE id = ?;`,
      [id]
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function putUserWhitId(email, password, name, firstname, id) {
  try {
    const conn = await db;
    const [result] = await conn.query(
      `UPDATE user SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?`,
      [email, password, name, firstname, id]
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteUserWhitId(id) {
  try {
    const conn = await db;
    const [result] = await conn.query(`DELETE FROM user WHERE id = ?;`, [id]);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {getUserWithMail, getUserWithId, putUserWhitId, deleteUserWhitId};
