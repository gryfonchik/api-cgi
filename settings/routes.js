'use strict'

module.exports = (app) => {
    const usersController = require('../Controller/usersController')
    const taskController = require('../Controller/taskController')

    app
        .route('/api/tasks')
        .get(taskController.getAllTask)
   
    app
        .route('/api/create/task')
        .post(taskController.createTask)
    
    app
        .route('/api/users')
        .get(usersController.getAllUsers)

    app
        .route('/api/auth/signup')
        .post(usersController.signup)
    
}