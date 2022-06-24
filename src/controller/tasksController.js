"use strict";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const endpoints = {
  getTaskById: async (req, res) => {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(req.body.id),
      },
      select: {
        id: true,
        player_id: true,
        client_id: true,
        title: true,
        info: true,
        type: true,
      },
    });
    if (Error) res.status(200).send(task);
  },

  getAllTasks: async (req, res) => {
    const tasks = await prisma.task.findMany({
      where: {
        player_id: null,
        moderated: true,
      },
      select: {
        id: true,
        title: true,
        info: true,
        type: true,
        moderated: true,
        url: true,
      },
    });
    res.status(200).send(tasks);
  },

  updateTask: async (req, res) => {
    const task = await prisma.task.update({
      where: {
        id: Number(req.body.id),
      },
      data: {
        title: String(req.body.title),
        info: String(req.body.info),
        type: String(req.body.type),
      },
      select: {
        title: true,
        info: true,
        type: true,
      },
    });
    res.status(200).send(task);
  },

  deleteTask: async (req, res) => {
    const del = await prisma.task.delete({
      where: {
        id: Number(req.body.id),
      },
    });
    res.status(200).send(del);
  },

  connectTask: async (req, res) => {
    const task = await prisma.task.update({
      where: {
        id: Number(req.body.id),
      },
      data: {
        player_id: Number(req.userId),
      },
    });
    res.status(200).send(task);
  },

  updateUrl: async (req, res) => {
    const task = await prisma.task.update({
      where: {
        id: Number(req.body.id),
      },
      data: {
        url: String(req.body.url),
      },
    });
    res.status(200).send(task);
  },

  updateStatus: async (req, res) => {
    const update = await prisma.task.update({
      where: {
        id: Number(req.body.id),
      },
      data: {
        moderated: Boolean(req.body.moder)
      },
    });
    res.status(200).send(update);
  },

  createTask: async (req, res) => {
    const task = await prisma.task.create({
      data: {
        client_id: Number(req.userId),
        title: String(req.body.title),
        info: String(req.body.info),
        type: String(req.body.type),
      },
    });
    res.status(200).send(task);
  },

  getTaskByClient: async (req, res) => {
    const task = await prisma.task.findMany({
      where: {
        client_id: Number(req.userId),
      },
      select: {
        id: true,
        player_id: true,
        client_id: true,
        title: true,
        info: true,
        type: true,
        moderated: true,
        url: true,
      },
    });
    res.status(200).send(task);
  },

  getTaskByPlayer: async (req, res) => {
    const task = await prisma.task.findMany({
      where: {
        player_id: Number(req.userId),
      },
      select: {
        id: true,
        player_id: true,
        client_id: true,
        title: true,
        info: true,
        type: true,
        moderated: true,
        url: true,
      },
    });
    res.status(200).send(task);
  },

};

export default endpoints;
