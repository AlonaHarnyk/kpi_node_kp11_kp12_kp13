import express from "express";
import {
  getContacts,
  deleteContact,
  addContact,
  updateContact
} from "../controllers/contactsControllers.js";

import {
  contactSchema,
  updateContactSchema,
} from "../schemas/contactSchemas.js";
import validateBody from "../utils/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getContacts);

contactsRouter.post("/", validateBody(contactSchema), addContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

export default contactsRouter;
