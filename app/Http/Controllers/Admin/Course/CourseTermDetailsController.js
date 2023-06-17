const db = require('../../../../../models');
const { validationResult } = require('express-validator');

exports.index = async (req, resp, next) => {
    await db.CourseCurriculumTermDetail.findAll({
        include: {
            model: db.CourseCurriculumTerm,
            as: 'term',
          }
    })
    .then((result) => {
        resp.render('dashboard/admin/course/term-topic/index',{
            term_topics: result,
            pageTitle: 'Course Term Topic'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
} 

exports.create =async (req, resp, next) =>{
    await db.CourseCurriculumTerm.findAll()
    .then((result) => {
        resp.render('dashboard/admin/course/term-topic/create',{
            course_term: result,
            pageTitle: 'Course Term Topic'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
}

exports.edit = async (req, resp, next) =>{
    var course_term = await db.CourseCurriculumTerm.findAll()
    .then( (course_term) =>{
        return course_term;
    });
    await db.CourseCurriculumTermDetail.findByPk(req.params.id)
    .then((result) => {
        resp.render('dashboard/admin/course/term-topic/edit',{
            term_topic: result,
            course_term:course_term,
            pageTitle: 'Course Term Topic'
        });  
    })
    .catch((error) => {
        throw new Error(error);
    });
}

exports.store = (req, resp, next) =>{
    db.CourseCurriculumTermDetail.create(req.body)
    .then(() => {
        req.flash('success', `New Term Topic added ${ req.body.name } successfully!`);
        resp.status(200).redirect('/course/term-topics');
    })
    .catch((error) => {
        throw new Error(error);
    });
}

exports.update = (req, resp, next) =>{
    db.CourseCurriculumTermDetail.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then( result => {        
        req.flash('warning', `Term topic updated ${ req.body.name } successfully!`)
        resp.status(200).redirect('/course/term-topics');
    })
    .catch(error => {
        throw new Error(error);
    })
}

exports.delete = async (req, resp, next) =>{
    await db.CourseCurriculumTermDetail.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => {      
        req.flash('warning', `Term topic deleted successfully!`);        
        resp.status(200).redirect('/course/term-topics');
    })
    .catch(error => {
        throw new Error(error);
    })
}