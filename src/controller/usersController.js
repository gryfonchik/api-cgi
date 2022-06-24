"use strict";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

import bcrypt from "bcryptjs/dist/bcrypt.js";
import jsonwebtoken from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

const endpoints = {
  getAllUsers: async (req, res) => {
    const users = await prisma.users.findMany({
      where: {
        role: {
          equals: 1
        }
      },
      select: {
        id: true,
        email: true,
        name: true,
        contacts: true,
        type: true,
        info: true,
        pay: true,
        ava: true,
        role: true,
      },
    });
    res.status(200).send(users);
  },

  getUserById: async (req, res) => {
    const user = await prisma.users.findUnique({
      where: {
        id: Number(req.body.id),
      },
      select: {
        email: true,
        name: true,
        contacts: true,
        type: true,
        info: true,
        pay: true,
        ava: true,
        role: true,
      },
    });
    if (!user) {
      res.status(404).send({
        message: "This user is not exist!",
      });
      return;
    }
    res.status(200).send(user);
  },

  updateUser: async (req, res) => {
     if (req.userId !== req.body.id) {
      res.status(403).send({
        detail: "Не твоё вот ты и бесишься",
      });
      return;
    }
    const user = await prisma.users.update({
      where: {
        id: Number(req.userId),
      },
      data: {
        name: String(req.body.name),
        contacts: String(req.body.contacts),
        type: String(req.body.type),
        info: String(req.body.info),
        pay: String(req.body.pay),
      },
    });
    res.status(200).send(user);
  },

  deleteUser: async (req, res) => {
    const del = await prisma.users.delete({
      where: {
        id: Number(req.body.id),
      },
    });
    res.status(200).send({
      message: "Delete user",
    });
  },

  signup: async (req, res) => {
    const salt = bcrypt.genSaltSync(15);
    const password = bcrypt.hashSync(req.body.password, salt);
    const signup = await prisma.users.create({
      data: {
        email: String(req.body.email),
        name: String(req.body.name),
        password: String(password),
        contacts: String(req.body.email),
        ava: "kartinka",
        info: "",
        role: Number(req.body.role),
      },
    });
    res.status(200).send({
      message: "User is registered!",
    });
  },

  me: async (req, res) => {
    const user = await prisma.users.findUnique({
      where: {
        id: Number(req.userId),
      },
      select: {
        id: true,
        email: true,
        name: true,
        contacts: true,
        type: true,
        info: true,
        pay: true,
        ava: true,
        role: true,
      },
    });
    res.status(200).send(user);
  },

  signin: async (req, res) => {
    const user = await prisma.users.findUnique({
      where: {
        email: String(req.body.email),
      },
      select: {
        id: true,
        email: true,
        name: true,
        contacts: true,
        type: true,
        info: true,
        password: true,
        role: true,
      },
    });
    if (!user) {
      res.status(400).send({
        message: "The user is not exist!",
      });
      return;
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(400).send({
        message: "Password is not matched!",
      });
      return;
    }
    let token = jsonwebtoken.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "120m",
      }
    );
    return res.status(200).send({
      token: token,
    });
  },

  uploadImage: async (req, res) => {
    if (!req.files) {
      res.status(403).send({
        detail: "No file uploaded",
      });
      return;
    }
    const tempPath = req.files.avatar[0];
    const fileName = `${uuidv4()}.png`;
    const targetPath = path.join(process.cwd(), `./uploads/${fileName}`);

    if (path.extname(tempPath.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath.path, targetPath, async (err) => {
        if (err) return handleError(err, res);

        const user = await prisma.users.update({
          where: {
            id: Number(req.userId),
          },
          data: {
            ava: String(fileName),
          },
        });

        return res.status(200).send({
          image: fileName,
        });
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);

        res.status(403).end({
          detail: "Ты какую-то херню отправил, исправляйся",
        });
      });
    }
  },
  getImage: async (req, res) => {
    res.sendFile(path.join(process.cwd(), `./uploads/${req.body.path}`));
  },
};

export default endpoints;
