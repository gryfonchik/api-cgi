'use strict'

const response = require('../response')
const db = require('../settings/db')

exports.getAllTask = (req, res) => {

    db.query('SELECT `title`, `info`, `type` FROM `task`',(error,rows,fields) => {
        if(error){
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })
}

exports.createTask = (req, res) => {

            const client_id = req.body.client_id
            const title = req.body.title
            const info = req.body.info
            const type = req.body.type

            const sql = "INSERT INTO `task`(`client_id`, `title`, `info`, `type`) VALUES('" + client_id + "', '" + title + "', '" + info + "', '" + type + "')";
            db.query(sql, (error, results) => {
                if(error) {
                    response.status(400, error, res)
                } else {
                    response.status(200, {message: `Задача умпешно добавлена.`, results}, res)
                }
            })
        }