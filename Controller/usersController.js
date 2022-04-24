'use strict'

const response = require('../response')
const db = require('../settings/db')

exports.getAllUsers = (req, res) => {

    db.query('SELECT `id`, `name`, `email` FROM `users`',(error,rows,fields) => {
        if(error){
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })

}

exports.signup = (req, res) => {
    //console.log(req.body.email);
    db.query("SELECT `id`, `email`, `name` FROM `users` WHERE `email` = '" +req.body.email+ "'", (error, rows, fields) => {
        //console.log(error, rows);
        if(error) {
            response.status(400, error, res)
        } else if(typeof rows !== 'undefined' && rows.length > 0){
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                response.status(302, {message: `Пользователь с таким email - ${rw.email} уже зарегстрирован!`}, res)
                return true
            })
        } else {
            response.status(200, 'Reg', res)
        }
    })
    
    
}
