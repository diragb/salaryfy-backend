const { body, validationResult } = require("express-validator");
const db = require("../../../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.store = async (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(422)
      .json({ message: "Validation Error", errorMessage: errors.array() });
  }
  db.UserDetails.create({
    name: req.body.name,
    email: req.body.email,
  })
    .then((result) => {
      var name = result.name;
      var email = result.email;
      var id = result.id;

      return resp.json({ name: name, email: email, id: id });
    })
    .catch((error) => {
      throw new Error(error);
    });
};
exports.update = async (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(422)
      .json({ message: "Validation Error", errorMessage: errors.array() });
  }
  await db.UserDetails.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return resp
          .status(422)
          .json({ message: "User not found. Please sign up!" });
      }
      var name = user.name;
      var email = user.email;
      var id = user.id;

      return resp.status(200).json({ name: name, email: email, id: id });
    })
    .catch((error) => {
      throw new Error(error);
    });
};

exports.FormDataSave = async (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(422)
      .json({ message: "Validation Error", errorMessage: errors.array() });
  }
  db.UserDetails.create(req.body)
    .then((result) => {
      var name = result.name;
      var email = result.email;
      var id = result.id;

      return resp.json({
        message: "Data Saved",
        name: name,
        email: email,
        id: id,
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
};

exports.collegeSearch = async (req, res) => {
	try {
    const { search } = await req.query;

		await db.College.findAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
      raw: true,
    }).then((result) => {
				res.status(200).json({ colleges: result });
			  })
			  .catch((error) => {
				throw new Error(error);
			  });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
};
