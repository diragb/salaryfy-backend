const db = require('../../../../../models');
const { validationResult } = require('express-validator');
const fs = require("fs");
const slugify = require('slugify')
const formidable = require("formidable");
const path = require("path");

exports.index = async (req, resp, next) => {
    await db.Course.findAll()
    .then((result) => {
        resp.render('dashboard/admin/course/index',{
            courses: result,
            pageTitle: 'Course'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
} 

exports.create =async (req, resp, next) =>{
    await db.CourseCategory.findAll()
    .then((result) => {
        resp.render('dashboard/admin/course/create',{
            categories: result,
            pageTitle: 'Course'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
}

exports.edit = async (req, resp, next) =>{
    var categories = await db.CourseCategory.findAll()
    .then( (categories) =>{
        return categories;
    });
    await db.Course.findByPk(req.params.id)
    .then((result) => {
        resp.render('dashboard/admin/course/edit',{
            course: result,
            categories:categories,
            pageTitle: 'Course'
        });  
    })
    .catch((error) => {
        throw new Error(error);
    });
}

exports.store = (req, resp, next) =>{
    const publicPath = path.join(
        __dirname,
        "../../../../../public/course/"
      );
      if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath, { recursive: true });
      }
      var banner_image = "";
      var form = new formidable.IncomingForm();
      form.parse(req, async function (err, fields, files) {
        if(files.image.originalFilename){
            var oldpath = files.image.filepath;
            var newpath = publicPath + files.image.originalFilename;
            banner_image = files.image.originalFilename;
            var num = 0;
            var check = fs.existsSync(newpath);

            while (check == true) {
            var new_number = num++;
            newfile = new_number + files.image.originalFilename;
            newpath = publicPath + newfile;
            banner_image = newfile;
            check = fs.existsSync(newpath);
            }

            fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            });
        }

        fields.slug = slugify(fields.name,{ replacement: '-', lower: true, });
        if(banner_image != ''){
            fields.image = banner_image;
        }
        await db.Course.create(fields)
        .then(() => {
            req.flash('success', `New Course added ${ fields.name } successfully!`);
            resp.status(200).redirect('/courses');
        })
        .catch((error) => {
            throw new Error(error);
        });
      }); 
}

exports.update = (req, resp, next) =>{
    const publicPath = path.join(
        __dirname,
        "../../../../../public/course/"
      );
      if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath, { recursive: true });
      }
      var banner_image = "";
      var form = new formidable.IncomingForm();
      form.parse(req, async function (err, fields, files) {
        if(files.image.originalFilename){
            var oldpath = files.image.filepath;
            var newpath = publicPath + files.image.originalFilename;
            banner_image = files.image.originalFilename;
            var num = 0;
            var check = fs.existsSync(newpath);
            while (check == true) {
            var new_number = num++;
            newfile = new_number + files.image.originalFilename;
            newpath = publicPath + newfile;
            banner_image = newfile;
            check = fs.existsSync(newpath);
            }
            fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            });
        }

        fields.slug = slugify(fields.name,{ replacement: '-', lower: true, });
        if(banner_image != ''){
            fields.image = banner_image;
        }
        await db.Course.update(fields,{
            where: {
                id: req.params.id
            }
        })
        .then( result => {        
            req.flash('warning', `Course updated ${ fields.name } successfully!`)
            resp.status(200).redirect('/courses');
        })
        .catch(error => {
            throw new Error(error);
        })
      });
    
    
}

exports.delete = async (req, resp, next) =>{
    await db.Course.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => {      
        req.flash('warning', `Course deleted successfully!`);        
        resp.status(200).redirect('/courses');
    })
    .catch(error => {
        throw new Error(error);
    })
}