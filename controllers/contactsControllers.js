import {
  getAllContacts,
  addOneContact,
  deleteOneContact,
  updateOneContact,
} from "../services/contactsServices.js";
import { isValidObjectId } from "mongoose";

import HttpError from "../utils/HttpError.js";

export const getContacts = async (_, res) => {
  const contacts = await getAllContacts();
  res.json(contacts);
};

export const deleteContact = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (!isValid) {
      throw HttpError(404);
    }

    const contact = await deleteOneContact(req.params.id);

    if (!contact) {
      throw HttpError(404);
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const newContact = await addOneContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (!isValid) {
      throw HttpError(404);
    }

    const contact = await updateOneContact(req.params.id, req.body);
    if (!contact) {
      throw HttpError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};
