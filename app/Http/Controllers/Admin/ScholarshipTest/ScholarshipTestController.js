const db = require('../../../../../models');
const { validationResult } = require('express-validator');

exports.index = async (req, resp, next) => {
    await db.Question.findAll({
        where: {
            course_id: req.params.course_id
        },
        include: [{
            model: db.Answer,
            as: 'answers',
          },
          {
            model:db.CorrectAnswer,
            as:'correct_answer'
          }]
    })
    .then((result) => {
        resp.render('dashboard/admin/scholarship-test/index',{
            questionsList: result,
            pageTitle: 'Questions',
            course_id: req.params.course_id
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
} 

exports.create = (req, resp, next) =>{
    resp.render('dashboard/admin/scholarship-test/create',{
        pageTitle: 'Questions',
        course_id: req.params.id        
    });
}

exports.edit = async (req, resp, next) =>{
    await db.Question.findByPk(req.params.id,{
        include: [{
            model: db.Answer,
            as: 'answers',
          },
          {
            model:db.CorrectAnswer,
            as:'correct_answer'
          }]
    })
    .then((result) => {
        resp.render('dashboard/admin/scholarship-test/edit',{
            questions: result,
            pageTitle: 'Questions'
        });  
    })
    .catch((error) => {
        throw new Error(error);
    });
}

exports.store = (req, resp, next) =>{
    db.Question.create(req.body)
    .then(async(result) => {
        var answer_id = 0;
        for (var i = 0; i < req.body.option.length; i++) {
            await db.Answer.create({
                question_id:result.id,
                answer:req.body.option[i]
            }).then(async(answer) =>{
                if(i+1 == req.body.correct_answer){
                    answer_id = answer.id;
                } 
            })
          }
          await db.CorrectAnswer.create({
                question_id:result.id,
                correct_answer_id:answer_id
            }).then(async(CorrectAnswer) =>{
                req.flash('success', `New Questions added ${ req.body.question } successfully!`);
                resp.status(200).redirect('/scholarship-test/'+req.body.course_id);
            })
            .catch((error) => {
                throw new Error(error);
            });     
    })
    .catch((error) => {
        throw new Error(error);
    }); 
}

exports.update = (req, resp, next) =>{
    db.Question.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then(async result => {    
        var answer_id = 0;
        await db.Answer.destroy({
            where: {
                question_id: req.params.id
            }
        })
        .then(async () => {      
            for (var i = 0; i < req.body.option.length; i++) {
                await db.Answer.create({
                    question_id:req.params.id,
                    answer:req.body.option[i]
                }).then(async(answer) =>{
                    if(i+1 == req.body.correct_answer){
                        answer_id = answer.id;
                    } 
                })
              }
              await db.CorrectAnswer.destroy({
                where: {
                    question_id: req.params.id
                }
            })
            .then(async () => { 
                await db.CorrectAnswer.create({
                    question_id:req.params.id,
                    correct_answer_id:answer_id
                }).then(async(CorrectAnswer) =>{
                    await db.Question.findByPk(req.params.id).then(async(question_id) =>{
                        req.flash('warning', `Questions updated ${ req.body.question } successfully!`)
                        resp.status(200).redirect('/scholarship-test/'+question_id.course_id);
                    })
                })
                .catch((error) => {
                    throw new Error(error);
                });
            });
        })
        .catch(error => {
            throw new Error(error);
        })
    })
    .catch(error => {
        throw new Error(error);
    })
}

exports.delete = async (req, resp, next) =>{
    await db.Question.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( async() => {  
            req.flash('warning', `Questions deleted successfully!`);        
            resp.status(200).redirect('back');
    })
    .catch(error => {
        throw new Error(error);
    })
}