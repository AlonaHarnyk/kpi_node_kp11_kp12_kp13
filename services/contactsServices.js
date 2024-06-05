import { Contact } from "../db/models/Contact.js";

export const getAllContacts = () => Contact.find();

export const addOneContact = (contactData) => Contact.create(contactData);

// export const deleteOneContact = (id) => Contact.findByIdAndDelete(id);

export const deleteOneContact = (id) => Contact.findOneAndDelete({_id: id});

export const updateOneContact = (id, data) => Contact.findByIdAndUpdate(id, data, {new: true});


