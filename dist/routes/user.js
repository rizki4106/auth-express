"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// controllers
const { UserController } = require('../controller');
// middleware
const { IsLogin } = require('../middleware/auth');
const userRouter = express.Router();
userRouter.post("/register", UserController.store);
userRouter.post("/login", UserController.login);
userRouter.post("/me", IsLogin, UserController.me);
userRouter.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});
module.exports = userRouter;
//# sourceMappingURL=user.js.map