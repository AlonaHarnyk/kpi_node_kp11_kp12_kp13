import express from "express";
import {
  getContacts,
  deleteContact,
  addContact
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getContacts);

contactsRouter.post("/", addContact);

contactsRouter.delete("/:id", deleteContact);

export default contactsRouter;
