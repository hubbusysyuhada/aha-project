const errorHandler = require("../middlewares/errorHandler");
const { authentication, authorization } = require("../middlewares/auth");
const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("Hello world from router");
});

router.get("/debug", async (req, res, next) => {
  res.send("helo");
});

// user routes
router.post("/register", UserController.register);
router.post("/auth", UserController.login);
// router.post("/auth/facebook", UserController.login);
// router.post("/auth/google", UserController.login);
router.post("/resend/:accountId", UserController.resendMail);
router.get("/verify/:accountId/:token", UserController.verify);
router.post("/change-password/:accountId", UserController.changePassword);

router.use(authentication);
router.get("/task", TaskController.getAllTask);
router.get("/task/:taskId", TaskController.getTask);

router.use(authorization);
router.post("/task", TaskController.newTask);
router.delete("/task/:taskId", TaskController.deleteTask);
router.patch("/task/:taskId", TaskController.updateTask);
router.put("/task/:taskId", TaskController.editTask);

router.use(errorHandler);

module.exports = router;
