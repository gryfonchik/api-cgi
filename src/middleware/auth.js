import jwt from "jsonwebtoken";

import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const auth = {
  verifyTokenMiddleware: (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.userId;
      req.userRole = decoded.userRole;
      next();
    });
  },
};

export default auth;
