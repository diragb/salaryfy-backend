const { body, validationResult } = require("express-validator");
const db = require("../../../../models");

exports.getQuestions = async (req, resp, next) => {
  try {
    await db.Question.findAll({
      include: {
        model: db.Answer,
        as: "answers",
      },
      where: { course_id: req.params.id },
      order: db.sequelize.random(),
      limit: 30,
    })
      .then((questions) => {
        resp.status(200).json({ questions: questions });
      })
      .catch((error) => {
        resp.status(500).json({ message: error });

        // throw new Error(error);
      });
  } catch (error) {
    resp.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

exports.submitScholarshipTest = async (req, resp, next) => {
  try {
    var user_id = req.decoded.user_id;
    var test_count = await db.ScholarshipTestReport.findAll({
      where: { user_id: user_id },
    }).then(async (result) => {
      return result;
    });
    if (test_count.length < 2) {
      var request = req.body;
      var total_questions = request.answers.length;
      var correctCount = 0;
      for (var i = 0; i < request.answers.length; i++) {
        await db.Question.findOne({
          where: {
            id: request.answers[i].question_id,
            course_id: request.course_id,
          },
          include: {
            model: db.CorrectAnswer,
            as: "correct_answer",
          },
        })
          .then(async (result) => {
            if (Boolean(result) && Object.keys(result.correct_answer).length) {
              if (
                request.answers[i].answer_id ==
                result.correct_answer.correct_answer_id
              ) {
                correctCount = correctCount + 1;
              }
            }
          })
          .catch((error) => {
            //   resp.status(500).json({ message: error });
            throw new Error(error);
          });
      }
      var raw = JSON.stringify(req.body);

      var total_percentage = (100 * correctCount) / total_questions;
      var security_fee = 0;
      if (total_percentage >= 76) {
        security_fee = 0;
      } else if (total_percentage <= 75 && total_percentage >= 50) {
        security_fee = 5000;
      } else if (total_percentage <= 49) {
        security_fee = 10000;
      }
      await db.ScholarshipTestReport.create({
        user_id: user_id,
        course_id: request.course_id,
        total_questions: total_questions,
        total_percentage: total_percentage,
        total_correct_count: correctCount,
        security_fee: security_fee,
        payload: raw,
      })
        .then(async (result) => {
          var user_id = req.decoded.user_id;
          var test_count = await db.ScholarshipTestReport.findAll({
            where: { user_id: user_id },
          }).then(async (result) => {
            return result;
          });
          var min_fee = await db.ScholarshipTestReport.min("security_fee", {
            where: { user_id: user_id },
          }).then(async (result) => {
            return result;
          });
          var total_percentage = await db.ScholarshipTestReport.findOne({
            where: { user_id: user_id, security_fee: min_fee },
          }).then(async (result) => {
            return result.total_percentage;
          });
          var course_id = await db.ScholarshipTestReport.findOne({
            where: { user_id: user_id, security_fee: min_fee },
          }).then(async (result) => {
            return result.course_id;
          });
          var transaction = await db.Transaction.findOne({
            where: { user_id: user_id, status: 1, transaction_type: 2 },
          }).then(async (result) => {
            if (result) {
              return true;
            } else {
              return false;
            }
          });

          return resp.status(200).json({
            message: "Test Report",
            total_percentage: total_percentage,
            security_fee: min_fee,
            total_attempts: test_count.length,
            transaction: transaction,
            course_id: course_id,
          });
          // return resp.status(200).json({
          //   message: "Test Report",
          //   total_percentage: total_percentage,
          //   total_correct_count: correctCount,
          //   total_questions: total_questions,
          //   security_fee: security_fee,
          //   total_attempts: test_count.length,
          // });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      return resp.status(200).json({
        message: "You are exceed maximum test limit",
      });
    }
  } catch (error) {
    resp.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

exports.ScholarshipTestReport = async (req, resp, next) => {
  try {
    var user_id = req.decoded.user_id;
    var test_count = await db.ScholarshipTestReport.findAll({
      where: { user_id: user_id },
    }).then(async (result) => {
      return result;
    });
    var min_fee = await db.ScholarshipTestReport.min("security_fee", {
      where: { user_id: user_id },
    }).then(async (result) => {
      return result;
    });
    var total_percentage = await db.ScholarshipTestReport.findOne({
      where: { user_id: user_id, security_fee: min_fee },
    }).then(async (result) => {
      return result.total_percentage;
    });
    var course_id = await db.ScholarshipTestReport.findOne({
      where: { user_id: user_id, security_fee: min_fee },
    }).then(async (result) => {
      return result.course_id;
    });
    var transaction = await db.Transaction.findOne({
      where: { user_id: user_id, status: 1, transaction_type: 2 },
    }).then(async (result) => {
      if (result) {
        return true;
      } else {
        return false;
      }
    });

    return resp.status(200).json({
      message: "Test Report",
      total_percentage: total_percentage,
      security_fee: min_fee,
      total_attempts: test_count.length,
      transaction: transaction,
      course_id: course_id,
    });
  } catch (error) {
    resp.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

exports.ScholarshipTestCount = async (req, resp, next) => {
  try {
    var user_id = req.decoded.user_id;
    var test_count = await db.ScholarshipTestReport.findAll({
      where: { user_id: user_id },
    }).then(async (result) => {
      return result;
    });

    return resp.status(200).json({
      message: "Test Count",
      total_attempts: test_count.length,
    });
  } catch (error) {
    resp.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};