const db = require('../../../../../models');
const { validationResult } = require('express-validator');

exports.index = async (req, resp, next) => {
    await db.CourseFeature.findAll({
        include: {
            model: db.Course,
            as: 'course',
          }
    })
    .then((result) => {
        resp.render('dashboard/admin/course/features/index',{
            features: result,
            pageTitle: 'Course Features'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
} 

exports.create =async (req, resp, next) =>{
    await db.Course.findAll()
    .then((result) => {
        resp.render('dashboard/admin/course/features/create',{
            courses: result,
            pageTitle: 'Course features'
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
    await db.CourseFeature.findByPk(req.params.id)
    .then((result) => {
        resp.render('dashboard/admin/course/features/edit',{
            features: result,
            courses:courses,
            pageTitle: 'Course features'
        });  
    })
    .catch(() => {
        throw new Error(error);
    });
}

exports.store = (req, resp, next) =>{
    db.CourseFeature.create(req.body)
    .then(() => {
        req.flash('success', `New features added ${ req.body.name } successfully!`);
        resp.status(200).redirect('/course/features');
    })
    .catch(() => {
        throw new Error(error);
    });
}

exports.update = (req, resp, next) =>{
    db.CourseFeature.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then( result => {        
        req.flash('warning', `Features updated ${ req.body.name } successfully!`)
        resp.status(200).redirect('/course/features');
    })
    .catch(error => {
        throw new Error(error);
    })
}

exports.delete = async (req, resp, next) =>{
    await db.CourseFeature.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => {      
        req.flash('warning', `Features deleted successfully!`);        
        resp.status(200).redirect('/course/features');
    })
    .catch(error => {
        throw new Error(error);
    })
}