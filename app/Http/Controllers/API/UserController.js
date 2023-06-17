const { body, validationResult } = require("express-validator");
const db = require("../../../../models");
const fs = require("fs");
const formidable = require("formidable");
const path = require("path");

exports.updateUserDetails = async (req, resp, next) => {
  var user_id = req.decoded.user_id;
  var user = await db.UserDetails.update(req.body, {
    where: {
      user_id: user_id,
    },
  })
    .then(async (result) => {
      if (req.body.name) {
        await db.User.update(
          { name: req.body.name },
          {
            where: {
              id: user_id,
            },
          }
        );
      }
      resp.status(200).json({ message: "Profile Update Successfully" });
    })
    .catch((error) => {
      throw new Error(error);
    });
};

exports.getUserDetails = async (req, resp, next) => {
  var user_id = req.decoded.user_id;
  var user = await db.UserDetails.findOne({
    where: {
      user_id: user_id,
    },
    include: {
      model: db.User,
      as: "user",
    },
  })
    .then(async (result) => {
      resp.status(200).json({ data: result });
    })
    .catch((error) => {
      throw new Error(error);
    });
};

exports.documentFileUpload = async (req, resp, next) => {
  var user_id = req.decoded.user_id;
  const documentPath = path.join(__dirname, "../../../../public/documents/");
  if (!fs.existsSync(documentPath)) {
    fs.mkdirSync(documentPath, { recursive: true });
  }
  var aadhar_image = "";
  var pan_image = "";
  var isa_image = "";
  // var form = formidable({ multiples: true });
  var form = new formidable.IncomingForm();

  form.parse(req, async function (err, fields, files) {
    if (files.aadhar_card) {
      var oldpath = files.aadhar_card.filepath;
      var newpath = documentPath + files.aadhar_card.originalFilename;
      aadhar_image = files.aadhar_card.originalFilename;
      var num = 0;
      var check = fs.existsSync(newpath);

      while (check == true) {
        var new_number = num++;
        newfile = new_number + files.aadhar_card.originalFilename;
        newpath = documentPath + newfile;
        aadhar_image = newfile;
        check = fs.existsSync(newpath);
      }

      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });
    }
    if (files.pan_card) {
      var oldpath = files.pan_card.filepath;
      var newpath = documentPath + files.pan_card.originalFilename;
      pan_image = files.pan_card.originalFilename;
      var num = 0;
      var check = fs.existsSync(newpath);

      while (check == true) {
        var new_number = num++;
        newfile = new_number + files.pan_card.originalFilename;
        newpath = documentPath + newfile;
        pan_image = newfile;
        check = fs.existsSync(newpath);
      }

      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });
    }
    if (files.isa) {
      var oldpath1 = files.isa.filepath;
      var newpath1 = documentPath + files.isa.originalFilename;
      isa_image = files.isa.originalFilename;
      var num1 = 0;
      var check1 = fs.existsSync(newpath1);

      while (check1 == true) {
        var new_number1 = num1++;
        newfile1 = new_number1 + files.isa.originalFilename;
        newpath1 = documentPath + newfile1;
        isa_image = newfile1;
        check1 = fs.existsSync(newpath1);
      }

      fs.rename(oldpath1, newpath1, function (err) {
        if (err) throw err;
      });
    }

    if (aadhar_image != "") {
      fields.aadhar_card = aadhar_image;
    }
    if (pan_image != "") {
      fields.pan_card = pan_image;
    }
    if (isa_image != "") {
      fields.isa = isa_image;
    }

    var check = await db.UserDocument.findAll({
      limit: 1,
      where: {
        user_id: user_id,
      },
    }).then(async (result) => {
      return result[0];
    });
    if (check) {
      await db.UserDocument.update(fields, {
        where: {
          user_id: user_id,
        },
      })
        .then(() => {
          return db.UserDocument.findOne({ where: { user_id: user_id } });
        })
        .then((result1) => {
          resp.status(200).json({ data: result1 });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      fields.user_id = user_id;
      await db.UserDocument.create(fields)
        .then(async (result1) => {
          resp.status(200).json({ data: result1 });
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  });
};

exports.getProcess = async (req, resp, next) => {
  try {
    var user_id = req.decoded.user_id;
    var user_eligiblity = await db.EligiblityTestReport.findOne({
      where: {
        user_id: user_id,
      },
    }).then(async (result) => {
      return result;
    });
    var user_transaction = await db.Transaction.findOne({
      where: {
        user_id: user_id,
        status: 1,
        transaction_type: 1,
      },
    }).then(async (result) => {
      return result;
    });
    var user_scholarship = await db.ScholarshipTestReport.findOne({
      where: {
        user_id: user_id,
      },
    }).then(async (result) => {
      return result;
    });
    var process = 0;
    if (user_eligiblity) {
      process = 1;
    }
    if (user_transaction) {
      process = 2;
    }
    if (user_scholarship) {
      process = 3;
    }
    resp.status(200).json({ process: process });
  } catch (error) {
    resp.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};
