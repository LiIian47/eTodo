const db = require("../../config/db");

async function getAllFromTodo() {
  try {
    const conn = await db;
    const [result] = await conn.query("SELECT * FROM todo");
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getTodoWhitUserId(id) {
  try {
    const conn = await db;
    const [result] = await conn.query(`SELECT * FROM todo WHERE user_id = ?;`, [id]);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getTitleFromTodo(params, user_id) {
  try {
    const formatParams = `%${params}%`;
    const conn = await db;
    const [result] = await conn.query(`SELECT title FROM todo WHERE title LIKE ? AND user_id = ?;`, [formatParams, user_id]);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getTodoWhitId(id) {
  try {
    const conn = await db;
    const [result] = await conn.query(`SELECT title , due_time , description , status , user_id FROM todo WHERE id = ?;`, [id]);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function postTodo(title, description, due_time, status, user_id) {
  try {
    const conn = await db;
    const [result] = await conn.query(
      `INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?);`,
      [title, description, due_time, status, user_id]
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function changeStatus(id , status) {
  try {
    const conn = await db;
    const [result] = await conn.query(
      `UPDATE todo SET status = ? WHERE id = ?;`,
      [status, id]
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


async function putTodo(id, title, description, due_time, status, user_id) {
  try {
    const conn = await db;
    const [result] = await conn.query(
      `UPDATE todo SET title = ?, description = ?, due_time = ?, status = ?, user_id = ? WHERE id = ?;`,
      [title, description, due_time, status, user_id, id]
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteTodo(id) {
  try {
    const conn = await db;
    const [result] = await conn.query(`DELETE FROM todo WHERE id = ?;`, [id]);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {getAllFromTodo, getTodoWhitUserId, getTodoWhitId, postTodo, putTodo, deleteTodo, changeStatus, getTitleFromTodo};
