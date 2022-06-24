"use strict";

import api from "../controller/index.js";
import auth from "../middleware/auth.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const user_routes = (app) => {
  const usersController = api.usersController;

  app.route("/api/users").get(usersController.getAllUsers);

  app.route("/api/user").post(usersController.getUserById);

  app
    .route("/api/user/up")
    .put([auth.verifyTokenMiddleware], usersController.updateUser);

  app.route("/api/user")
  .delete([auth.verifyTokenMiddleware], usersController.deleteUser);

  app.route("/api/user/signup").post(usersController.signup);

  app.route("/api/user/signin").post(usersController.signin);

  app.route("/api/user/me").post(
    [
      auth.verifyTokenMiddleware,
    ],
    usersController.me
  );

  app
    .route("/api/user/upload-image")
    .post(
      [
        auth.verifyTokenMiddleware,
        upload.fields([{ name: "avatar", maxCount: 1 }]),
      ],
      usersController.uploadImage
    );

  app.route("/api/user/upload-image").get(usersController.getImage);
};

export default user_routes;
