  "use strict";

import api from "../controller/index.js";
import auth from "../middleware/auth.js";

const task_routes = (app) => {
  const tasksController = api.tasksController;

  app.route("/api/tasks").get(tasksController.getAllTasks);

  app.route("/api/task").get(tasksController.getTaskById);

  app.route("/api/task").put(tasksController.updateTask);
  
  app.route("/api/task/url").put(tasksController.updateUrl);

  app.route("/api/task/con").put([auth.verifyTokenMiddleware], tasksController.connectTask);

  app.route("/api/task").delete(tasksController.deleteTask);

  app.route("/api/task").post([auth.verifyTokenMiddleware], tasksController.createTask);

  app.route("/api/status").put(tasksController.updateStatus);

  app.route("/api/status-by-client").post([auth.verifyTokenMiddleware],tasksController.getTaskByClient);

  app.route("/api/status-by-player").post([auth.verifyTokenMiddleware],tasksController.getTaskByPlayer);
};

export default task_routes;
