const { body, validationResult } = require("express-validator");
const db = require("../../../../models");
const fs = require("fs");
const formidable = require("formidable");
const path = require("path");

exports.storeDetails = async (req, resp, next) => {
  var user_id = req.decoded.user_id;
  const documentPath = path.join(
    __dirname,
    "../../../../public/direct_placed_documents/"
  );
  if (!fs.existsSync(documentPath)) {
    fs.mkdirSync(documentPath, { recursive: true });
  }
  var aadhar_image = "";
  var pan_image = "";
  var consent_path = "";
  var passport_photo_path = "";
  var resume_path = "";
  var x_certificate_path = "";
  var xii_certificate_path = "";
  var passbook_photocopy_path = "";
  var cancelled_cheque_path = "";
  var graduate_marksheet_path = "";
  var graduate_certificate_path = "";
  var post_graduate_certificate_path = "";
  var work_experience_letter_path = "";
  var three_month_salary_slip_path = "";
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
    if (files.consent) {
      var oldpath1 = files.consent.filepath;
      var newpath1 = documentPath + files.consent.originalFilename;
      consent_path = files.consent.originalFilename;
      var num1 = 0;
      var check1 = fs.existsSync(newpath1);

      while (check1 == true) {
        var new_number1 = num1++;
        newfile1 = new_number1 + files.consent.originalFilename;
        newpath1 = documentPath + newfile1;
        consent_path = newfile1;
        check1 = fs.existsSync(newpath1);
      }

      fs.rename(oldpath1, newpath1, function (err) {
        if (err) throw err;
      });
    }
    if (files.passport_photo) {
      var oldpath2 = files.passport_photo.filepath;
      var newpath2 = documentPath + files.passport_photo.originalFilename;
      passport_photo_path = files.passport_photo.originalFilename;
      var num2 = 0;
      var check2 = fs.existsSync(newpath2);

      while (check2 == true) {
        var new_number2 = num2++;
        newfile2 = new_number2 + files.passport_photo.originalFilename;
        newpath2 = documentPath + newfile2;
        passport_photo_path = newfile2;
        check2 = fs.existsSync(newpath2);
      }

      fs.rename(oldpath2, newpath2, function (err) {
        if (err) throw err;
      });
    }
    if (files.resume) {
      var oldpath3 = files.resume.filepath;
      var newpath3 = documentPath + files.resume.originalFilename;
      resume_path = files.resume.originalFilename;
      var num3 = 0;
      var check3 = fs.existsSync(newpath3);

      while (check3 == true) {
        var new_number3 = num3++;
        newfile3 = new_number3 + files.resume.originalFilename;
        newpath3 = documentPath + newfile3;
        resume_path = newfile3;
        check3 = fs.existsSync(newpath3);
      }

      fs.rename(oldpath3, newpath3, function (err) {
        if (err) throw err;
      });
    }
    if (files.x_certificate) {
      var oldpath4 = files.x_certificate.filepath;
      var newpath4 = documentPath + files.x_certificate.originalFilename;
      x_certificate_path = files.x_certificate.originalFilename;
      console.log(x_certificate_path)
      var num4 = 0;
      var check4 = fs.existsSync(newpath4);

      while (check4 == true) {
        var new_number4 = num4++;
        newfile4 = new_number4 + files.x_certificate.originalFilename;
        newpath4 = documentPath + newfile4;
        x_certificate_path = newfile4;
      console.log('ggggggggg................',x_certificate_path)

        check4 = fs.existsSync(newpath4);
      }

      fs.rename(oldpath4, newpath4, function (err) {
        if (err) throw err;
      });
    }
    if (files.xii_certificate) {
      var oldpath5 = files.xii_certificate.filepath;
      var newpath5 = documentPath + files.xii_certificate.originalFilename;
      xii_certificate_path = files.xii_certificate.originalFilename;
      var num5 = 0;
      var check5 = fs.existsSync(newpath5);

      while (check5 == true) {
        var new_number5 = num5++;
        newfile5 = new_number5 + files.xii_certificate.originalFilename;
        newpath5 = documentPath + newfile5;
        xii_certificate_path = newfile5;
        check5 = fs.existsSync(newpath5);
      }

      fs.rename(oldpath5, newpath5, function (err) {
        if (err) throw err;
      });
    }
    if (files.passbook_photocopy) {
      var oldpath6 = files.passbook_photocopy.filepath;
      var newpath6 = documentPath + files.passbook_photocopy.originalFilename;
      passbook_photocopy_path = files.passbook_photocopy.originalFilename;
      var num6 = 0;
      var check6 = fs.existsSync(newpath6);

      while (check6 == true) {
        var new_number6 = num6++;
        newfile6 = new_number6 + files.passbook_photocopy.originalFilename;
        newpath6 = documentPath + newfile6;
        passbook_photocopy_path = newfile6;
        check6 = fs.existsSync(newpath6);
      }

      fs.rename(oldpath6, newpath6, function (err) {
        if (err) throw err;
      });
    }
    if (files.cancelled_cheque) {
      var oldpath7 = files.cancelled_cheque.filepath;
      var newpath7 = documentPath + files.cancelled_cheque.originalFilename;
      cancelled_cheque_path = files.cancelled_cheque.originalFilename;
      var num7 = 0;
      var check7 = fs.existsSync(newpath7);

      while (check7 == true) {
        var new_number7 = num7++;
        newfile7 = new_number7 + files.cancelled_cheque.originalFilename;
        newpath7 = documentPath + newfile7;
        cancelled_cheque_path = newfile7;
        check7 = fs.existsSync(newpath7);
      }

      fs.rename(oldpath7, newpath7, function (err) {
        if (err) throw err;
      });
    }
    if (files.graduate_certificate) {
      var oldpath8 = files.graduate_certificate.filepath;
      var newpath8 = documentPath + files.graduate_certificate.originalFilename;
      graduate_certificate_path = files.graduate_certificate.originalFilename;
      var num8 = 0;
      var check8 = fs.existsSync(newpath8);

      while (check8 == true) {
        var new_number8 = num8++;
        newfile8 = new_number8 + files.graduate_certificate.originalFilename;
        newpath8 = documentPath + newfile8;
        graduate_certificate_path = newfile8;
        check8 = fs.existsSync(newpath8);
      }

      fs.rename(oldpath8, newpath8, function (err) {
        if (err) throw err;
      });
    }
    if (files.graduate_marksheet) {
      var oldpath12 = files.graduate_marksheet.filepath;
      var newpath12 = documentPath + files.graduate_marksheet.originalFilename;
      graduate_marksheet_path = files.graduate_marksheet.originalFilename;
      var num12 = 0;
      var check12 = fs.existsSync(newpath12);

      while (check12 == true) {
        var new_number12 = num12++;
        newfile12 = new_number12 + files.graduate_marksheet.originalFilename;
        newpath12 = documentPath + newfile12;
        graduate_marksheet_path = newfile12;
        check12 = fs.existsSync(newpath12);
      }

      fs.rename(oldpath12, newpath12, function (err) {
        if (err) throw err;
      });
    }
    if (files.post_graduate_certificate) {
      var oldpath9 = files.post_graduate_certificate.filepath;
      var newpath9 =
        documentPath + files.post_graduate_certificate.originalFilename;
      post_graduate_certificate_path =
        files.post_graduate_certificate.originalFilename;
      var num9 = 0;
      var check9 = fs.existsSync(newpath9);

      while (check9 == true) {
        var new_number9 = num9++;
        newfile9 =
          new_number9 + files.post_graduate_certificate.originalFilename;
        newpath9 = documentPath + newfile9;
        post_graduate_certificate_path = newfile9;
        check9 = fs.existsSync(newpath9);
      }

      fs.rename(oldpath9, newpath9, function (err) {
        if (err) throw err;
      });
    }
    if (files.work_experience_letter) {
      var oldpath10 = files.work_experience_letter.filepath;
      var newpath10 =
        documentPath + files.work_experience_letter.originalFilename;
      work_experience_letter_path =
        files.work_experience_letter.originalFilename;
      var num10 = 0;
      var check10 = fs.existsSync(newpath10);

      while (check10 == true) {
        var new_number10 = num10++;
        newfile10 =
          new_number10 + files.work_experience_letter.originalFilename;
        newpath10 = documentPath + newfile10;
        work_experience_letter_path = newfile10;
        check10 = fs.existsSync(newpath10);
      }

      fs.rename(oldpath10, newpath10, function (err) {
        if (err) throw err;
      });
    }
    if (files.three_month_salary_slip) {
      var oldpath11 = files.three_month_salary_slip.filepath;
      var newpath11 =
        documentPath + files.three_month_salary_slip.originalFilename;
      three_month_salary_slip_path =
        files.three_month_salary_slip.originalFilename;
      var num11 = 0;
      var check11 = fs.existsSync(newpath11);

      while (check11 == true) {
        var new_number11 = num11++;
        newfile11 =
          new_number11 + files.three_month_salary_slip.originalFilename;
        newpath11 = documentPath + newfile11;
        three_month_salary_slip_path = newfile11;
        check11 = fs.existsSync(newpath11);
      }

      fs.rename(oldpath11, newpath11, function (err) {
        if (err) throw err;
      });
    }

    if (aadhar_image != "") {
      fields.aadhar_card = aadhar_image;
    }
    if (pan_image != "") {
      fields.pan_card = pan_image;
    }
    if (consent_path != "") {
      fields.isa = consent_path;
    }
    if (passport_photo_path != "") {
      fields.passport_photo_path = passport_photo_path;
    }
    if (resume_path != "") {
      fields.resume_path = resume_path;
    }
    if (x_certificate_path != "") {
      fields.x_certificate_path = x_certificate_path;
    }
    if (xii_certificate_path != "") {
      fields.xii_certificate_path = xii_certificate_path;
    }
    if (passbook_photocopy_path != "") {
      fields.passbook_photocopy_path = passbook_photocopy_path;
    }
    if (cancelled_cheque_path != "") {
      fields.cancelled_cheque_path = cancelled_cheque_path;
    }
    if (graduate_certificate_path != "") {
      fields.graduate_certificate_path = graduate_certificate_path;
    }
    if (post_graduate_certificate_path != "") {
      fields.post_graduate_certificate_path = post_graduate_certificate_path;
    }
    if (work_experience_letter_path != "") {
      fields.work_experience_letter_path = work_experience_letter_path;
    }
    if (three_month_salary_slip_path != "") {
      fields.three_month_salary_slip_path = three_month_salary_slip_path;
    }

    var check = await db.DirectPlacedAddInfo.findAll({
      limit: 1,
      where: {
        user_id: user_id,
      },
    }).then(async (result) => {
      return result[0];
    });
    if (check) {
      if (fields.gender) {
        await db.UserDetails.update(
          { gender: fields.gender },
          {
            where: {
              user_id: user_id,
            },
          }
        );
      }
      if (fields.age) {
        await db.UserDetails.update(
          { age: fields.age },
          {
            where: {
              user_id: user_id,
            },
          }
        );
      }
      await db.DirectPlacedAddInfo.update(fields, {
        where: {
          user_id: user_id,
        },
      })
        .then(() => {
          return db.DirectPlacedAddInfo.findOne({
            where: { user_id: user_id },
          });
        })
        .then((result1) => {
          resp.status(200).json({ data: result1 });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      fields.user_id = user_id;
      if (fields.gender) {
        await db.UserDetails.update(
          { gender: fields.gender },
          {
            where: {
              user_id: user_id,
            },
          }
        );
      }
      if (fields.age) {
        await db.UserDetails.update(
          { age: fields.age },
          {
            where: {
              user_id: user_id,
            },
          }
        );
      }
      await db.DirectPlacedAddInfo.create(fields)
        .then(async (result1) => {
          resp.status(200).json({ data: result1 });
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  });
};
