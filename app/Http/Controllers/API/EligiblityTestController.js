const { body, validationResult } = require("express-validator");
const db = require("../../../../models");

exports.getQuestions = async (req, resp, next) => {
  var logical_questions = await db.Question.findAll({
    include: {
      model: db.Answer,
      as: "answers",
    },
    where: { category: "logical_reasoning" },
    order: db.sequelize.random(),
    limit: 5,
  })
    .then((logical_questions) => {
      return logical_questions;
    })
    .catch((error) => {
      throw new Error(error);
    });
  var audio_visual_questions = await db.Question.findAll({
    include: {
      model: db.Answer,
      as: "answers",
    },
    where: { category: "audio_visual_processing" },
    order: db.sequelize.random(),
    limit: 5,
  })
    .then((audio_visual_processing) => {
      return audio_visual_processing;
    })
    .catch((error) => {
      throw new Error(error);
    });
  var language_questions = await db.Question.findAll({
    include: {
      model: db.Answer,
      as: "answers",
    },
    where: { category: "language_comprehension" },
    order: db.sequelize.random(),
    limit: 10,
  })
    .then((language_comprehension) => {
      return language_comprehension;
    })
    .catch((error) => {
      throw new Error(error);
    });
  // await db.Visitor.create({visitor:1}).then((visitor) =>{
    var updated_questions = logical_questions.concat(audio_visual_questions);
    updated_questions = updated_questions.concat(language_questions);
    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }
    updated_questions =  shuffle(updated_questions);
    resp.status(200).json({ questions: updated_questions });
  // })
  
};

exports.getEligibiltyCount = async (req, resp, next) => {
  var testCount = await db.EligiblityTestReport.count()
    .then((count) => {
      return count;
    })
    .catch((error) => {
      throw new Error(error);
    });
      resp.status(200).json({ testCount: testCount });
    
};

exports.getVisitorCount = async (req, resp, next) => {
  var VisitorCount = await db.Visitor.count()
    .then((count) => {
      return count;
    })
    .catch((error) => {
      throw new Error(error);
    });
      resp.status(200).json({ VisitorCount: VisitorCount });
    
};
exports.createVisitorCount = async (req, resp, next) => {
  await db.Visitor.create({visitor:1})
  .then((visitor) =>{
    resp.status(200).json({ visitor: visitor });
    })
    .catch((error) => {
      throw new Error(error);
    });
    
};
exports.submitEligiblityTest = async (req, res, next) => {
  var request = req.body;
  var request_total_questions = request[0].answers.length;
  var total_questions = 20;
  var correctCount = 0;
  var total_logical_reasoning = 0;
  var logical_reasoning = 0;
  var total_language_comprehension = 0;
  var language_comprehension = 0;
  var total_audio_visual_processing = 0;
  var audio_visual_processing = 0;
  for (var i = 0; i < request[0].answers.length; i++) {
    // await db.Answer.findByPk(request.answers[i])
    //   .then(async (answer) => {
        // await db.Question.findByPk(answer.question_id, {
        //   include: [
        //     {
        //       model: db.CorrectAnswer,
        //       as: "correct_answer",
        //     },
        //   ],
        // }) 
        await db.Question.findOne({
          where: {
            id: request[0].answers[i].question_id,
          },
          include: {
            model: db.CorrectAnswer,
            as: "correct_answer",
          },
        })
          .then(async (result) => {
            if (result.category == "logical_reasoning") {
              total_logical_reasoning = total_logical_reasoning + 1;
            }
            if (result.category == "language_comprehension") {
              total_language_comprehension = total_language_comprehension + 1;
            }
            if (result.category == "audio_visual_processing") {
              total_audio_visual_processing = total_audio_visual_processing + 1;
            }
            // if (request.answers[i] == result.correct_answer.correct_answer_id) {
              if (request[0].answers[i].answer_id == result.correct_answer.correct_answer_id) {
              correctCount = correctCount + 1;
              if (result.category == "logical_reasoning") {
                logical_reasoning = logical_reasoning + 1;
              }
              if (result.category == "language_comprehension") {
                language_comprehension = language_comprehension + 1;
              }
              if (result.category == "audio_visual_processing") {
                audio_visual_processing = audio_visual_processing + 1;
              }
            }
          })
          .catch((error) => {
            throw new Error(error);
          });
      // })
      // .catch((error) => {
      //   throw new Error(error);
      // });
  }

  var total_percentage = (100 * correctCount) / total_questions;
  if(logical_reasoning > 0 && total_logical_reasoning > 0){
    var total_percentage_in_logical_reasoning =
    (100 * logical_reasoning) / total_logical_reasoning;
  }else{
    total_percentage_in_logical_reasoning = 0
  }
  if(language_comprehension > 0 && total_language_comprehension){
    var total_percentage_in_language_comprehension =
    (100 * language_comprehension) / total_language_comprehension;
  }else{
    total_percentage_in_language_comprehension = 0
  }
  if(audio_visual_processing > 0 && total_audio_visual_processing){
    var total_percentage_in_audio_visual_processing =
    (100 * audio_visual_processing) / total_audio_visual_processing;
  }else{
    total_percentage_in_audio_visual_processing = 0
  }
  if(logical_reasoning > 0&& total_questions > 0){
    var test_percentage_in_logical_reasoning =
    (100 * logical_reasoning) / total_questions;
  }else{
    test_percentage_in_logical_reasoning = 0
  }
  if(language_comprehension > 0 && total_questions > 0){
    var test_percentage_in_language_comprehension =
    (100 * language_comprehension) / total_questions;
  }else{
    test_percentage_in_language_comprehension = 0
  }
  if(audio_visual_processing > 0 && total_questions > 0 ){
    var test_percentage_in_audio_visual_processing =
    (100 * audio_visual_processing) / total_questions;
  }else{
    test_percentage_in_audio_visual_processing = 0
  }

  
  var user_id = req.decoded.user_id;
  var salary_hike_percentage = 0;
  var salary_in_lpa = 0;
  var current_package = 0;
  var type = 0;
  var redirect_type = 0;
  var message = "";
  var is_eligible = 0;

  await db.UserDetails.findOne({ where: { user_id: user_id } }).then(
    async (user_details) => {
      type = user_details.type;
      if (language_comprehension >= 8) {
        if (user_details.type == 2) {
          // for experienced
          type = 2;
          current_package = user_details.last_salary;
          if (user_details.last_salary >= 3 && user_details.last_salary <= 5) {
            redirect_type = 3
            if (user_details.total_experience == 2) {
              if (correctCount >= 18) {
                salary_hike_percentage = 200;
              } else if (correctCount <= 17 && correctCount >= 15) {
                salary_hike_percentage = 150;
              } else if (correctCount <= 14 && correctCount >= 11) {
                salary_hike_percentage = 90;
              } else if (correctCount <= 10 && correctCount >= 8) {
                salary_hike_percentage = 60;
              } else {
                salary_hike_percentage = 30;
              }
            }
            if (user_details.total_experience >= 5) {
              if (correctCount >= 18) {
                salary_hike_percentage = 180;
              } else if (correctCount <= 17 && correctCount >= 15) {
                salary_hike_percentage = 140;
              } else if (correctCount <= 14 && correctCount >= 11) {
                salary_hike_percentage = 110;
              } else if (correctCount <= 10 && correctCount >= 8) {
                salary_hike_percentage = 80;
              } else {
                salary_hike_percentage = 30;
              }
            }
          }
          if (user_details.last_salary == 7) {
            redirect_type = 2

            if (correctCount >= 18) {
              salary_hike_percentage = 120;
            } else if (correctCount <= 17 && correctCount >= 15) {
              salary_hike_percentage = 80;
            } else if (correctCount <= 14 && correctCount >= 11) {
              salary_hike_percentage = 60;
            } else if (correctCount <= 10 && correctCount >= 8) {
              salary_hike_percentage = 40;
            } else {
              salary_hike_percentage = 25;
            }
          }
          if (user_details.last_salary == 8) {
            if (correctCount >= 18) {
              salary_hike_percentage = 80;
            } else if (correctCount <= 17 && correctCount >= 15) {
              salary_hike_percentage = 75;
            } else if (correctCount <= 14 && correctCount >= 11) {
              salary_hike_percentage = 70;
            } else if (correctCount <= 10 && correctCount >= 8) {
              salary_hike_percentage = 65;
            } else {
              salary_hike_percentage = 60;
            }
          }
          if (language_comprehension >= 8 && total_percentage >= 45) {
            message = "Congratulations you are eligible";
            is_eligible = 1;
          } else {
            message = "You are not eligible";
          }
        }
        if (user_details.type == 1) {
          //for fresher
          type = 1;
          redirect_type = 1
          var college_id = user_details.collage_id;
          await db.College.findByPk(college_id).then(async (college) => {
            if (user_details.edu_background == "tech") {
              if (
                user_details.graduation_score <= "50" &&
                user_details.graduation_score >= "46"
              ) {
                if (correctCount >= 18) {
                  if (college.type == 3) {
                    salary_in_lpa = 11;
                  } else if (college.type == 1) {
                    salary_in_lpa = 7;
                  }
                } else if (correctCount <= 17 && correctCount >= 15) {
                  if (college.type == 3) {
                    salary_in_lpa = 10;
                  } else if (college.type == 1) {
                    salary_in_lpa = 7;
                  }
                } else if (correctCount <= 14 && correctCount >= 11) {
                  if (college.type == 3) {
                    salary_in_lpa = 9;
                  } else if (college.type == 1) {
                    salary_in_lpa = 6;
                  }
                } else if (correctCount <= 10 && correctCount >= 8) {
                  if (college.type == 3) {
                    salary_in_lpa = 8;
                  } else if (college.type == 1) {
                    salary_in_lpa = 6;
                  }
                } else {
                  if (college.type == 3) {
                    salary_in_lpa = 7;
                  } else if (college.type == 1) {
                    salary_in_lpa = 5;
                  }
                }
              }
              if (
                user_details.graduation_score <= "59" &&
                user_details.graduation_score >= "50"
              ) {
                if (correctCount >= 18) {
                  if (college.type == 3) {
                    salary_in_lpa = 12;
                  } else if (college.type == 1) {
                    salary_in_lpa = 8;
                  }
                } else if (correctCount <= 17 && correctCount >= 15) {
                  if (college.type == 3) {
                    salary_in_lpa = 11;
                  } else if (college.type == 1) {
                    salary_in_lpa = 8;
                  }
                } else if (correctCount <= 14 && correctCount >= 11) {
                  if (college.type == 3) {
                    salary_in_lpa = 10;
                  } else if (college.type == 1) {
                    salary_in_lpa = 7;
                  }
                } else if (correctCount <= 10 && correctCount >= 8) {
                  if (college.type == 3) {
                    salary_in_lpa = 9;
                  } else if (college.type == 1) {
                    salary_in_lpa = 6;
                  }
                } else {
                  if (college.type == 3) {
                    salary_in_lpa = 8;
                  } else if (college.type == 1) {
                    salary_in_lpa = 5;
                  }
                }
              }
              if (
                user_details.graduation_score <= "69" &&
                user_details.graduation_score >= "60"
              ) {
                if (correctCount >= 18) {
                  if (college.type == 3) {
                    salary_in_lpa = 14;
                  } else if (college.type == 1) {
                    salary_in_lpa = 9;
                  }
                } else if (correctCount <= 17 && correctCount >= 15) {
                  if (college.type == 3) {
                    salary_in_lpa = 12;
                  } else if (college.type == 1) {
                    salary_in_lpa = 9;
                  }
                } else if (correctCount <= 14 && correctCount >= 11) {
                  if (college.type == 3) {
                    salary_in_lpa = 11;
                  } else if (college.type == 1) {
                    salary_in_lpa = 8;
                  }
                } else if (correctCount <= 10 && correctCount >= 8) {
                  if (college.type == 3) {
                    salary_in_lpa = 10;
                  } else if (college.type == 1) {
                    salary_in_lpa = 7;
                  }
                } else {
                  if (college.type == 3) {
                    salary_in_lpa = 9;
                  } else if (college.type == 1) {
                    salary_in_lpa = 6;
                  }
                }
              }
              if (
                user_details.graduation_score <= "79" &&
                user_details.graduation_score >= "70"
              ) {
                if (correctCount >= 18) {
                  if (college.type == 3) {
                    salary_in_lpa = 16;
                  } else if (college.type == 1) {
                    salary_in_lpa = 10;
                  }
                } else if (correctCount <= 17 && correctCount >= 15) {
                  if (college.type == 3) {
                    salary_in_lpa = 13;
                  } else if (college.type == 1) {
                    salary_in_lpa = 9;
                  }
                } else if (correctCount <= 14 && correctCount >= 11) {
                  if (college.type == 3) {
                    salary_in_lpa = 12;
                  } else if (college.type == 1) {
                    salary_in_lpa = 9;
                  }
                } else if (correctCount <= 10 && correctCount >= 8) {
                  if (college.type == 3) {
                    salary_in_lpa = 11;
                  } else if (college.type == 1) {
                    salary_in_lpa = 8;
                  }
                } else {
                  if (college.type == 3) {
                    salary_in_lpa = 10;
                  } else if (college.type == 1) {
                    salary_in_lpa = 6;
                  }
                }
              }
              if (
                user_details.graduation_score <= "89" &&
                user_details.graduation_score >= "80"
              ) {
                if (correctCount >= 18) {
                  if (college.type == 3) {
                    salary_in_lpa = 18;
                  } else if (college.type == 1) {
                    salary_in_lpa = 12;
                  }
                } else if (correctCount <= 17 && correctCount >= 15) {
                  if (college.type == 3) {
                    salary_in_lpa = 14;
                  } else if (college.type == 1) {
                    salary_in_lpa = 10;
                  }
                } else if (correctCount <= 14 && correctCount >= 11) {
                  if (college.type == 3) {
                    salary_in_lpa = 13;
                  } else if (college.type == 1) {
                    salary_in_lpa = 9;
                  }
                } else if (correctCount <= 10 && correctCount >= 8) {
                  if (college.type == 3) {
                    salary_in_lpa = 10;
                  } else if (college.type == 1) {
                    salary_in_lpa = 8;
                  }
                } else {
                  if (college.type == 3) {
                    salary_in_lpa = 11;
                  } else if (college.type == 1) {
                    salary_in_lpa = 6;
                  }
                }
              }
              if (user_details.graduation_score >= "90") {
                if (correctCount >= 18) {
                  if (college.type == 3) {
                    salary_in_lpa = 24;
                  } else if (college.type == 1) {
                    salary_in_lpa = 12;
                  }
                } else if (correctCount <= 17 && correctCount >= 15) {
                  if (college.type == 3) {
                    salary_in_lpa = 22;
                  } else if (college.type == 1) {
                    salary_in_lpa = 11;
                  }
                } else if (correctCount <= 14 && correctCount >= 11) {
                  if (college.type == 3) {
                    salary_in_lpa = 20;
                  } else if (college.type == 1) {
                    salary_in_lpa = 10;
                  }
                } else if (correctCount <= 10 && correctCount >= 8) {
                  if (college.type == 3) {
                    salary_in_lpa = 14;
                  } else if (college.type == 1) {
                    salary_in_lpa = 8;
                  }
                } else {
                  if (college.type == 3) {
                    salary_in_lpa = 12;
                  } else if (college.type == 1) {
                    salary_in_lpa = 7;
                  }
                }
              }
            }

            if (user_details.edu_background == "non_tech") {
              if (
                user_details.graduation_score <= "50" &&
                user_details.graduation_score >= "46"
              ) {
                if (correctCount >= 18) {
                  if (college.type == 3) {
                    salary_in_lpa = 9;
                  } else if (college.type == 1) {
                    salary_in_lpa = 5;
                  }
                } else if (correctCount <= 17 && correctCount >= 15) {
                  if (college.type == 3) {
                    salary_in_lpa = 9;
                  } else if (college.type == 1) {
                    salary_in_lpa = 6;
                  }
                } else if (correctCount <= 14 && correctCount >= 11) {
                  if (college.type == 3) {
                    salary_in_lpa = 8;
                  } else if (college.type == 1) {
                    salary_in_lpa = 6;
                  }
                } else if (correctCount <= 10 && correctCount >= 8) {
                  if (college.type == 3) {
                    salary_in_lpa = 7;
                  } else if (college.type == 1) {
                    salary_in_lpa = 5;
                  }
                } else {
                  if (college.type == 3) {
                    salary_in_lpa = 6;
                  } else if (college.type == 1) {
                    salary_in_lpa = 5;
                  }
                }
              }
              if (
                user_details.graduation_score <= "59" &&
                user_details.graduation_score >= "50"
              ) {
                if (correctCount >= 18) {
                  if (college.type == 3) {
                    salary_in_lpa = 10;
                  } else if (college.type == 1) {
                    salary_in_lpa = 6;
                  }
                } else if (correctCount <= 17 && correctCount >= 15) {
                  if (college.type == 3) {
                    salary_in_lpa = 10;
                  } else if (college.type == 1) {
                    salary_in_lpa = 7;
                  }
                } else if (correctCount <= 14 && correctCount >= 11) {
                  if (college.type == 3) {
                    salary_in_lpa = 9;
                  } else if (college.type == 1) {
                    salary_in_lpa = 6;
                  }
                } else if (correctCount <= 10 && correctCount >= 8) {
                  if (college.type == 3) {
                    salary_in_lpa = 8;
                  } else if (college.type == 1) {
                    salary_in_lpa = 6;
                  }
                } else {
                  if (college.type == 3) {
                    salary_in_lpa = 8;
                  } else if (college.type == 1) {
                    salary_in_lpa = 5;
                  }
                }
              }
              if (
                user_details.graduation_score <= "69" &&
                user_details.graduation_score >= "60"
              ) {
                if (correctCount >= 18) {
                  if (college.type == 3) {
                    salary_in_lpa = 12;
                  } else if (college.type == 1) {
                    salary_in_lpa = 7;
                  }
                } else if (correctCount <= 17 && correctCount >= 15) {
                  if (college.type == 3) {
                    salary_in_lpa = 11;
                  } else if (college.type == 1) {
                    salary_in_lpa = 8;
                  }
                } else if (correctCount <= 14 && correctCount >= 11) {
                  if (college.type == 3) {
                    salary_in_lpa = 10;
                  } else if (college.type == 1) {
                    salary_in_lpa = 7;
                  }
                } else if (correctCount <= 10 && correctCount >= 8) {
                  if (college.type == 3) {
                    salary_in_lpa = 8;
                  } else if (college.type == 1) {
                    salary_in_lpa = 7;
                  }
                } else {
                  if (college.type == 3) {
                    salary_in_lpa = 8;
                  } else if (college.type == 1) {
                    salary_in_lpa = 6;
                  }
                }
              }
              if (
                user_details.graduation_score <= "79" &&
                user_details.graduation_score >= "70"
              ) {
                if (correctCount >= 18) {
                  if (college.type == 3) {
                    salary_in_lpa = 14;
                  } else if (college.type == 1) {
                    salary_in_lpa = 9;
                  }
                } else if (correctCount <= 17 && correctCount >= 15) {
                  if (college.type == 3) {
                    salary_in_lpa = 12;
                  } else if (college.type == 1) {
                    salary_in_lpa = 8;
                  }
                } else if (correctCount <= 14 && correctCount >= 11) {
                  if (college.type == 3) {
                    salary_in_lpa = 10;
                  } else if (college.type == 1) {
                    salary_in_lpa = 7;
                  }
                } else if (correctCount <= 10 && correctCount >= 8) {
                  if (college.type == 3) {
                    salary_in_lpa = 9;
                  } else if (college.type == 1) {
                    salary_in_lpa = 8;
                  }
                } else {
                  if (college.type == 3) {
                    salary_in_lpa = 8;
                  } else if (college.type == 1) {
                    salary_in_lpa = 7;
                  }
                }
              }
              if (
                user_details.graduation_score <= "89" &&
                user_details.graduation_score >= "80"
              ) {
                if (correctCount >= 18) {
                  if (college.type == 3) {
                    salary_in_lpa = 18;
                  } else if (college.type == 1) {
                    salary_in_lpa = 10;
                  }
                } else if (correctCount <= 17 && correctCount >= 15) {
                  if (college.type == 3) {
                    salary_in_lpa = 13;
                  } else if (college.type == 1) {
                    salary_in_lpa = 9;
                  }
                } else if (correctCount <= 14 && correctCount >= 11) {
                  if (college.type == 3) {
                    salary_in_lpa = 11;
                  } else if (college.type == 1) {
                    salary_in_lpa = 8;
                  }
                } else if (correctCount <= 10 && correctCount >= 8) {
                  if (college.type == 3) {
                    salary_in_lpa = 9;
                  } else if (college.type == 1) {
                    salary_in_lpa = 8;
                  }
                } else {
                  if (college.type == 3) {
                    salary_in_lpa = 9;
                  } else if (college.type == 1) {
                    salary_in_lpa = 5;
                  }
                }
              }
              if (user_details.graduation_score >= "90") {
                if (correctCount >= 18) {
                  if (college.type == 3) {
                    salary_in_lpa = 20;
                  } else if (college.type == 1) {
                    salary_in_lpa = 11;
                  }
                } else if (correctCount <= 17 && correctCount >= 15) {
                  if (college.type == 3) {
                    salary_in_lpa = 15;
                  } else if (college.type == 1) {
                    salary_in_lpa = 10;
                  }
                } else if (correctCount <= 14 && correctCount >= 11) {
                  if (college.type == 3) {
                    salary_in_lpa = 23;
                  } else if (college.type == 1) {
                    salary_in_lpa = 9;
                  }
                } else if (correctCount <= 10 && correctCount >= 8) {
                  if (college.type == 3) {
                    salary_in_lpa = 11;
                  } else if (college.type == 1) {
                    salary_in_lpa = 8;
                  }
                } else {
                  if (college.type == 3) {
                    salary_in_lpa = 10;
                  } else if (college.type == 1) {
                    salary_in_lpa = 5;
                  }
                }
              }
            }
          }); //college type 1 for other institutions, 2 for fake institutions, 3 for B Schools
          if (
            language_comprehension >= 8 &&
            total_percentage >= 45 &&
            user_details.graduation_score > "45"
          ) {
            message = "Congratulations you are eligible";
            is_eligible = 1;
          } else {
            message = "You are eligible";
          }
        }
      }else{
        // if(user_details.type == 1 && user_details.graduation_score > "45"){
          if(user_details.type == 1){
          redirect_type = 1
          var college_id = user_details.collage_id;
          await db.College.findByPk(college_id).then(async (college) => {
          if (user_details.edu_background == "tech") {
            if (college.type == 3) {
              salary_in_lpa = 7;
            } else if (college.type == 1) {
              salary_in_lpa = 6;
            }else{
              salary_in_lpa = 5;
            }
          }
          if (user_details.edu_background == "non_tech") {
            if (college.type == 3) {
              salary_in_lpa = 6;
            } else if (college.type == 1) {
              salary_in_lpa = 5;
            }else{
              salary_in_lpa = 5;
            }
          }
        })
        }
        if(user_details.type == 2){
          current_package = user_details.last_salary;

          if (user_details.last_salary >= 3 && user_details.last_salary <= 5) {
            redirect_type = 3
          }
          if (user_details.last_salary >= 6) {
            redirect_type = 2
          }
          if (correctCount <= 20 && correctCount >= 16) {
            if (user_details.edu_background == "tech") {
              salary_hike_percentage = 30;
            }else if(user_details.edu_background == "non_tech"){
              salary_hike_percentage = 27;
            }
          } else if (correctCount <= 15 && correctCount >= 10) {
            if (user_details.edu_background == "tech") {
              salary_hike_percentage = 26;
            }else if(user_details.edu_background == "non_tech"){
              salary_hike_percentage = 24;
            }
          } else if (correctCount <= 9 && correctCount >= 1) {
            if (user_details.edu_background == "tech") {
              salary_hike_percentage = 22;
            }else if(user_details.edu_background == "non_tech"){
              salary_hike_percentage = 20;
            }
          } 
        }
        is_eligible = 2;
        message = "You are eligible";
      }
    }
  );
  var raw = JSON.stringify(req.body);

  await db.EligiblityTestReport.create({
    user_id: user_id,
    user_type: type,
    total_questions: total_questions,
    salary_hike_percentage: salary_hike_percentage,
    salary_in_lpa: salary_in_lpa,
    total_percentage: total_percentage,
    total_correct_count: correctCount,
    test_percentage_in_logical_reasoning:
      test_percentage_in_logical_reasoning,
    test_percentage_in_language_comprehension:
      test_percentage_in_language_comprehension,
    test_percentage_in_audio_visual_processing:
      test_percentage_in_audio_visual_processing,
    total_percentage_in_logical_reasoning:
      total_percentage_in_logical_reasoning,
    total_percentage_in_language_comprehension:
      total_percentage_in_language_comprehension,
    total_percentage_in_audio_visual_processing:
      total_percentage_in_audio_visual_processing,
      is_eligible:is_eligible,
      payload:raw
  })
    .then((result) => {
      return res.status(200).json({
        message: message,
        is_eligible:is_eligible,
        type: type,
        redirect_type:redirect_type,
        current_package: current_package,
        total_questions: total_questions,
        salary_hike_percentage: salary_hike_percentage,
        salary_in_lpa: salary_in_lpa,
        total_percentage: total_percentage,
        total_correct_count: correctCount,
        test_percentage_in_logical_reasoning:
          test_percentage_in_logical_reasoning,
        test_percentage_in_language_comprehension:
          test_percentage_in_language_comprehension,
        test_percentage_in_audio_visual_processing:
          test_percentage_in_audio_visual_processing,
        total_percentage_in_logical_reasoning:
          total_percentage_in_logical_reasoning,
        total_percentage_in_language_comprehension:
          total_percentage_in_language_comprehension,
        total_percentage_in_audio_visual_processing:
          total_percentage_in_audio_visual_processing,
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
};
