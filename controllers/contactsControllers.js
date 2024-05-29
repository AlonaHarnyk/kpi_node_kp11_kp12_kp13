import fs from "fs/promises";
import path from "path";

import HttpError from "../utils/HttpError.js";
import { nanoid } from "nanoid";
import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

const filePath = path.join(process.cwd(), "db", "db.json");

export const getContacts = async (_, res) => {
  const data = await fs.readFile(filePath, "utf-8");
  const parsedData = JSON.parse(data);
  res.json(parsedData);
};

export const deleteContact = async (req, res, next) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    const { id } = req.params;

    const contact = parsedData.find((contact) => contact.id === id);

    // if (!contact) {
    //   res.status(404).json({ message: "Not found" });
    //   return;
    // }

    if (!contact) {
      throw HttpError(404);
    }

    const filteredData = parsedData.filter((contact) => contact.id !== id);
    await fs.writeFile(filePath, JSON.stringify(filteredData, null, 2));
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const data = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(data);

    const newContact = { id: nanoid(), ...req.body };

    const newData = [...parsedData, newContact];

    await fs.writeFile(filePath, JSON.stringify(newData, null, 2));

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};
