'use strict'

module.exports = (app) => {
    const usersController = require('../Controller/usersController')
    
    app
        .route('/api/users')
        .get(usersController.getAllUsers)

    app
        .route('/api/auth/signup')
        .post(usersController.signup)
    
}