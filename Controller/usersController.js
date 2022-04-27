"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const response = require("../response");
const db = require("../settings/db");

exports.getAllUsers = (req, res) => {
  db.query(
    "SELECT `id`, `name`, `email` FROM `users`",
    (error, rows, fields) => {
      if (error) {
        response.status(400, error, res);
      } else {
        response.status(200, rows, res);
      }
    }
  );
};

exports.signup = (req, res) => {
  //console.log(req.body.email);
  db.query(
    "SELECT `id`, `email`, `name` FROM `users` WHERE `email` = '" +
      req.body.email +
      "'",
    (error, rows, fields) => {
      //console.log(error, rows);
      if (error) {
        response.status(400, error, res);
      } else if (typeof rows !== "undefined" && rows.length > 0) {
        const row = JSON.parse(JSON.stringify(rows));
        row.map((rw) => {
          response.status(
            302,
            {
              message: `Пользователь с таким email - ${rw.email} уже зарегстрирован!`,
            },
            res
          );
          return true;
        });
      } else {
        const email = req.body.email;
        const name = req.body.name;
        const contacts = req.body.email;
        const ava = "kartinka";
        const info = "";
        const role = req.body.role;

        const salt = bcrypt.genSaltSync(15);
        const password = bcrypt.hashSync(req.body.password, salt);

        const sql =
          "INSERT INTO `users`(`name`, `email`, `password`, `contacts`, `info`, `ava`, `role`) VALUES('" +
          name +
          "', '" +
          email +
          "', '" +
          password +
          "', '" +
          contacts +
          "', '" +
          info +
          "', '" +
          ava +
          "', '" +
          role +
          "')";
        db.query(sql, (error, results) => {
          if (error) {
            response.status(400, error, res);
          } else {
            response.status(
              200,
              { message: `Регистрация прошла успешно.`, results },
              res
            );
          }
        });
      }
    }
  );
};

exports.signin = (req, res) => {
  db.query(
    "SELECT `id`, `email`, `password` FROM `users` WHERE `email` = '" +
      req.body.email +
      "'",
    (error, rows, fields) => {
      if (error) {
        response.status(400, error, res);
      } else if (rows.length <= 0) {
        response.status(
          401,
          {
            message: `Пользователь с email - ${req.body.email} не найден. Пройдите регистрацию.`,
          },
          res
        );
      } else {
        const row = JSON.parse(JSON.stringify(rows));
        row.map((rw) => {
          const password = bcrypt.compareSync(req.body.password, rw.password);
          if (password) {
            const token = jwt.sign(
              {
                userId: rw.id,
                email: rw.email,
              },
              process.env.jwt,
              { expiresIn: 120 * 120 }
            );
            response.status(200, { token: `Bearer ${token}` }, res);
          } else {
            //Выкидываем ошибку что пароль не верный
            response.status(401, { message: `Пароль не верный.` }, res);
          }
          return true;
        });
      }
    }
  );
};
