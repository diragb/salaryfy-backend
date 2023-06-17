const db = require("../../../../../models");
const { validationResult } = require("express-validator");
const fs = require("fs");
const formidable = require("formidable");
const path = require("path");

exports.create = (req, resp, next) => {
  resp.render("dashboard/admin/question/only-question/create", {
    pageTitle: "Questions",
  });
};

exports.edit = async (req, resp, next) => {
  await db.Question.findByPk(req.params.id, {
    include: [
      {
        model: db.Answer,
        as: "answers",
      },
      {
        model: db.CorrectAnswer,
        as: "correct_answer",
      },
    ],
  })
    .then((result) => {
      resp.render("dashboard/admin/question/only-question/edit", {
        questions: result,
        pageTitle: "Questions",
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
};

exports.store = (req, resp, next) => {
  const questionPath = path.join(__dirname, "../../../../../public/question/");
  if (!fs.existsSync(questionPath)) {
    fs.mkdirSync(questionPath, { recursive: true });
  }
  var question_image = "";
  var form = formidable({ multiples: true });
  form.parse(req, async function (err, fields, files) {
    if (files.image.originalFilename) {
      var oldpath = files.image.filepath;
      var newpath = questionPath + files.image.originalFilename;
      question_image = files.image.originalFilename;
      var num = 0;
      var check = fs.existsSync(newpath);

      while (check == true) {
        var new_number = num++;
        newfile = new_number + files.image.originalFilename;
        newpath = questionPath + newfile;
        question_image = newfile;
        check = fs.existsSync(newpath);
      }

      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });
    }

    if (question_image != "") {
      fields.media_path = question_image;
    }
    console.log(fields);
    db.Question.create(fields)
      .then(async (result) => {
        var answer_id = 0;
        for (var i = 0; i < fields.option.length; i++) {
          await db.Answer.create({
            question_id: result.id,
            answer: fields.option[i],
          }).then(async (answer) => {
            if (i + 1 == fields.correct_answer) {
              answer_id = answer.id;
            }
          });
        }
        await db.CorrectAnswer.create({
          question_id: result.id,
          correct_answer_id: answer_id,
        })
          .then(async (CorrectAnswer) => {
            req.flash(
              "success",
              `New Questions added ${fields.question} successfully!`
            );
            resp.status(200).redirect("/questions");
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
};

exports.update = async (req, resp, next) => {
  const questionPath = path.join(__dirname, "../../../../../public/question/");
  if (!fs.existsSync(questionPath)) {
    fs.mkdirSync(questionPath, { recursive: true });
  }
  var question_image = "";
  var form = formidable({ multiples: true });
  form.parse(req, async function (err, fields, files) {
    if (files.image.originalFilename) {
      var oldpath = files.image.filepath;
      var newpath = questionPath + files.image.originalFilename;
      question_image = files.image.originalFilename;
      var num = 0;
      var check = fs.existsSync(newpath);

      while (check == true) {
        var new_number = num++;
        newfile = new_number + files.image.originalFilename;
        newpath = questionPath + newfile;
        question_image = newfile;
        check = fs.existsSync(newpath);
      }

      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });
    }

    if (question_image != "") {
      fields.media_path = question_image;
    }

    db.Question.update(fields, {
      where: {
        id: req.params.id,
      },
    })
      .then(async (result) => {
        var answer_id = 0;
        await db.Answer.destroy({
          where: {
            question_id: req.params.id,
          },
        })
          .then(async () => {
            for (var i = 0; i < fields.option.length; i++) {
              await db.Answer.create({
                question_id: req.params.id,
                answer: fields.option[i],
              }).then(async (answer) => {
                if (i + 1 == fields.correct_answer) {
                  answer_id = answer.id;
                }
              });
            }
            await db.CorrectAnswer.destroy({
              where: {
                question_id: req.params.id,
              },
            }).then(async () => {
              await db.CorrectAnswer.create({
                question_id: req.params.id,
                correct_answer_id: answer_id,
              })
                .then(async (CorrectAnswer) => {
                  req.flash(
                    "warning",
                    `Questions updated ${fields.question} successfully!`
                  );
                  resp.status(200).redirect("/questions");
                })
                .catch((error) => {
                  throw new Error(error);
                });
            });
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
};
