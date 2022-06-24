"use strict";

import { response } from "express";

export default (status, values, res) => {
  const data = {
    status: status,
    values: values,
  };

  res.status(data.status);
  res.json(data);
  res.end();
}; 