const db = require('../../../../../models');
const { validationResult } = require('express-validator');

exports.index = async (req, resp, next) => {
    await db.CourseJobRole.findAll({
        include: {
            model: db.Course,
            as: 'course',
          }
    })
    .then((result) => {
        resp.render('dashboard/admin/course/job-roles/index',{
            job_roles: result,
            pageTitle: 'Course Job Roles'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
} 

exports.create =async (req, resp, next) =>{
    await db.Course.findAll()
    .then((result) => {
        resp.render('dashboard/admin/course/job-roles/create',{
            courses: result,
            pageTitle: 'Course Job Role'
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
    await db.CourseJobRole.findByPk(req.params.id)
    .then((result) => {
        resp.render('dashboard/admin/course/job-roles/edit',{
            job_role: result,
            courses:courses,
            pageTitle: 'Course Job Role'
        });  
    })
    .catch(() => {
        throw new Error(error);
    });
}

exports.store = (req, resp, next) =>{
    db.CourseJobRole.create(req.body)
    .then(() => {
        req.flash('success', `New job role added ${ req.body.name } successfully!`);
        resp.status(200).redirect('/course/job-roles');
    })
    .catch(() => {
        throw new Error(error);
    });
}

exports.update = (req, resp, next) =>{
    db.CourseJobRole.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then( result => {        
        req.flash('warning', `Job role updated ${ req.body.name } successfully!`)
        resp.status(200).redirect('/course/job-roles');
    })
    .catch(error => {
        throw new Error(error);
    })
}

exports.delete = async (req, resp, next) =>{
    await db.CourseJobRole.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => {      
        req.flash('warning', `Job role deleted successfully!`);        
        resp.status(200).redirect('/course/job-roles');
    })
    .catch(error => {
        throw new Error(error);
    })
}