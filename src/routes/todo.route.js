const todoController = require("../controllers/todos.controller");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  const token = req.get("auth");
  if (!token)
    return res
      .status(403)
      .send("FORBIDDEN")
      .end();
  try {
    const user = jwt.verify(token, "test");
    req.user = user;
    next();
  } catch (error) {
    res
      .status(403)
      .send("FORBIDDEN")
      .end();
  }
});

router.post("/", (req, res, next) => {
  const todo = req.body;
  todo.userId = req.user._id;
  return todoController
    .create(todo)
    .then(doc =>
      res
        .status(201)
        .send(doc)
        .end()
    )
    .catch(next);
});

router.get("/", (req, res, next) => {
  const userId = req.user._id;
  return todoController
    .getAll(userId)
    .then(doc =>
      res
        .status(200)
        .send(doc)
        .end()
    )
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  const userId = req.user._id;
  return todoController
    .getById(req.params.id, userId)
    .then(doc => {
      if (!doc) return res.status(404).end();
      return res
        .status(200)
        .send(doc)
        .end();
    })
    .catch(next);
});
router.put("/:id", (req, res, next) => {
  const userId = req.user._id;
  const data = req.body;

  return todoController
    .update(req.params.id, userId, data)
    .then(doc =>
      res
        .status(200)
        .send(doc)
        .end()
    )
    .catch(next);
});
router.delete("/:id", (req, res, next) => {
  const userId = req.user._id;
  return todoController
    .delete(req.params.id, userId)
    .then(() => res.status(200).end())
    .catch(next);
});

module.exports = router;
