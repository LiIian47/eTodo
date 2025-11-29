const express = require("express");
const app = express();
const user = require("./routes/user/user.js");
const todos = require("./routes/todos/todos.js");
const auth = require("./routes/auth/index.js");
const found = require("./middleware/notFound.js");
var cors = require('cors')
app.use(cors());
app.use(express.json());
app.use("/",auth);
app.use("/",user);
app.use("/",todos);
app.use(found);
app.listen(3000);



