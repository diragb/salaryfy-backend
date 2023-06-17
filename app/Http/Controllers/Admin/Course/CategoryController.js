const db = require('../../../../../models');
const { validationResult } = require('express-validator');

exports.index = async (req, resp, next) => {
    await db.CourseCategory.findAll()
    .then((result) => {
        resp.render('dashboard/admin/course/category/index',{
            categories: result,
            pageTitle: 'Course Category'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
} 

exports.create = (req, resp, next) =>{
    resp.render('dashboard/admin/course/category/create',{
        pageTitle: 'Course Category'
        
    });
}

exports.edit = async (req, resp, next) =>{
    await db.CourseCategory.findByPk(req.params.id)
    .then((result) => {
        resp.render('dashboard/admin/course/category/edit',{
            category: result,
            pageTitle: 'Course Category'
        });  
    })
    .catch(() => {
        throw new Error(error);
    });
}

exports.store = (req, resp, next) =>{
    db.CourseCategory.create(req.body)
    .then(() => {
        req.flash('success', `New Category added ${ req.body.name } successfully!`);
        resp.status(200).redirect('/course/categories');
    })
    .catch(() => {
        throw new Error(error);
    });
}

exports.update = (req, resp, next) =>{
    db.CourseCategory.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then( result => {        
        req.flash('warning', `Category updated ${ req.body.name } successfully!`)
        resp.status(200).redirect('/course/categories');
    })
    .catch(error => {
        throw new Error(error);
    })
}

exports.delete = async (req, resp, next) =>{
    await db.CourseCategory.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => {      
        req.flash('warning', `Category deleted successfully!`);        
        resp.status(200).redirect('/course/categories');
    })
    .catch(error => {
        throw new Error(error);
    })
}