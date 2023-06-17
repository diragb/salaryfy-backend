const { body, validationResult } = require("express-validator");
const db = require("../../../../models");

exports.storeContact = async (req, resp, next) => {
    await db.Contact.create(req.body)
      .then((contact) => {
        resp.status(200).json({ contact: contact });
      })
      .catch((error) => {
        throw new Error(error);
      });
      
  };
