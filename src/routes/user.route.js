const userController = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/register", (req, res, next) => {
  let data = req.body;
  return userController
    .register(data.email, data.name, data.password)
    .then(data =>
      res
        .status(201)
        .header("auth", data.token)
        .send(data.user)
        .end()
    )
    .catch(err => {
      next(err);
    });
});
router.post("/login", (req, res, next) => {
  let userData = req.body;
  return userController
    .login(userData.email, userData.password)
    .then(data =>
      res
        .status(200)
        .header("auth", data.token)
        .send(data.user)
        .end()
    )
    .catch(err => {
      next(err);
    });
});

module.exports = router;
