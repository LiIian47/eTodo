const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const secure = require("../../middleware/secure");
const {getTodoWhitUserId, getAllFromTodo, getTodoWhitId, postTodo, putTodo, deleteTodo, changeStatus} = require("./todos.query");

router.get("/todos", auth, /*secure({ lock: true }),*/ async (req, res) => {
  try {
    const result = await getAllFromTodo();
    if (result.length === 0) {
      res.json({ msg: "Not found" });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/todos/:id", auth, /*secure({ checkTodoUserId: true }),*/ async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getTodoWhitId(id);
    if (result.length === 0) {
      return res.json({ msg: "Not found" });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/todos", auth, async (req, res) => {
  try {
    const user_id = req.payload.id;
    const { title, description, due_time, status } = req.body;
    const result = await postTodo( title, description, due_time, status, user_id);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});


router.patch("/todos/status/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const id = req.params.id;

    const result = await changeStatus(id ,status);
    if (result.length === 0) {
      return res.json({ msg: "Not found" });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});


router.put("/todos/:id", auth, /*secure({ checkTodoUserId: true }),*/ async (req, res) => {
  try {
    const { title, description, due_time, status } = req.body;
    const id = req.params.id;
    const user_id = req.payload.id;

    const result = await putTodo(id, title, description, due_time, status, user_id,);
    if (result.length === 0) {
      return res.json({ msg: "Not found" });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.delete("/todos/:id", auth, /*secure({ checkTodoUserId: true }),*/ async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteTodo(id);
    if (result.length === 0) {
      return res.json({ msg: "Not found" });
    }
    res.status(200).json({ msg: `Successfully deleted record number : ${id}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/user/todos", auth, async (req, res) => {
  try {
    const result = await getTodoWhitUserId(req.payload.id);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
