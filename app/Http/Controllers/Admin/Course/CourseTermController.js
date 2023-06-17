const db = require('../../../../../models');
const { validationResult } = require('express-validator');

exports.index = async (req, resp, next) => {
    await db.CourseCurriculumTerm.findAll({
        include: {
            model: db.Course,
            as: 'course',
          }
    })
    .then((result) => {
        resp.render('dashboard/admin/course/term/index',{
            course_terms: result,
            pageTitle: 'Course Term'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
} 

exports.create =async (req, resp, next) =>{
    await db.Course.findAll()
    .then((result) => {
        resp.render('dashboard/admin/course/term/create',{
            courses: result,
            pageTitle: 'Course Term'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
}

exports.edit = async (req, resp, next) =>{
    var courses = await db.Course.findAll()
    .then( (courses) =>{
        return courses;
    });
    await db.CourseCurriculumTerm.findByPk(req.params.id)
    .then((result) => {
        resp.render('dashboard/admin/course/term/edit',{
            term: result,
            courses:courses,
            pageTitle: 'Course Term'
        });  
    })
    .catch(() => {
        throw new Error(error);
    });
}

exports.store = (req, resp, next) =>{
    db.CourseCurriculumTerm.create(req.body)
    .then(() => {
        req.flash('success', `New Term added ${ req.body.name } successfully!`);
        resp.status(200).redirect('/course/terms');
    })
    .catch(() => {
        throw new Error(error);
    });
}

exports.update = (req, resp, next) =>{
    db.CourseCurriculumTerm.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then( result => {        
        req.flash('warning', `Term updated ${ req.body.name } successfully!`)
        resp.status(200).redirect('/course/terms');
    })
    .catch(error => {
        throw new Error(error);
    })
}

exports.delete = async (req, resp, next) =>{
    await db.CourseCurriculumTerm.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => {      
        req.flash('warning', `Term deleted successfully!`);        
        resp.status(200).redirect('/course/terms');
    })
    .catch(error => {
        throw new Error(error);
    })
}