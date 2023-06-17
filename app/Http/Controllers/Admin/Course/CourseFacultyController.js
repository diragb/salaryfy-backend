const db = require('../../../../../models');
const { validationResult } = require('express-validator');
const fs = require("fs");
const formidable = require("formidable");
const path = require("path");

exports.index = async (req, resp, next) => {
    await db.CourseFaculty.findAll({
        include: {
            model: db.Course,
            as: 'course',
          }
    })
    .then((result) => {
        resp.render('dashboard/admin/course/course_faculty/index',{
            faculties: result,
            pageTitle: 'Course Faculty'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
} 

exports.create =async (req, resp, next) =>{
    await db.Course.findAll()
    .then((result) => {
        resp.render('dashboard/admin/course/course_faculty/create',{
            courses: result,
            pageTitle: 'Course Faculty'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
}

exports.edit = async (req, resp, next) =>{
    var course = await db.Course.findAll()
    .then( (course) =>{
        return course;
    });
    await db.CourseFaculty.findByPk(req.params.id)
    .then((result) => {
        resp.render('dashboard/admin/course/course_faculty/edit',{
            courses: course,
            course_faculty: result,
            pageTitle: 'Course Faculty'
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
      var p_image = "";
      var v_video = "";
      var form = new formidable.IncomingForm();
      form.parse(req, async function (err, fields, files) {

        if(files.image.originalFilename){
            var oldpath = files.image.filepath;
            var newpath = publicPath + files.image.originalFilename;
            p_image = files.image.originalFilename;
            var num = 0;
            var check = fs.existsSync(newpath);

            while (check == true) {
            var new_number = num++;
            newfile = new_number + files.image.originalFilename;
            newpath = publicPath + newfile;
            p_image = newfile;
            check = fs.existsSync(newpath);
            }

            fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            });
        }
        if(files.video.originalFilename){
            var oldpath = files.video.filepath;
            var newpath = publicPath + files.video.originalFilename;
            v_video = files.video.originalFilename;
            var num = 0;
            var check = fs.existsSync(newpath);

            while (check == true) {
            var new_number = num++;
            newfile = new_number + files.video.originalFilename;
            newpath = publicPath + newfile;
            v_video = newfile;
            check = fs.existsSync(newpath);
            }

            fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            });
        }
        if(p_image != ''){
            fields.profile_image = p_image;
        }
        if(v_video != ''){
            fields.media_path = v_video;
        }
        await db.CourseFaculty.create(fields)
        .then(() => {
            req.flash('success', `New Course Faculty added ${ fields.name } successfully!`);
            resp.status(200).redirect('/course/course-faculties');
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
      var p_image = "";
      var v_video = "";
      var form = new formidable.IncomingForm();
      form.parse(req, async function (err, fields, files) {
        if(files.image.originalFilename){
            var oldpath = files.image.filepath;
            var newpath = publicPath + files.image.originalFilename;
            p_image = files.image.originalFilename;
            var num = 0;
            var check = fs.existsSync(newpath);
            while (check == true) {
            var new_number = num++;
            newfile = new_number + files.image.originalFilename;
            newpath = publicPath + newfile;
            p_image = newfile;
            check = fs.existsSync(newpath);
            }
            fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            });
        }
        if(files.video.originalFilename){
            var oldpath = files.video.filepath;
            var newpath = publicPath + files.video.originalFilename;
            v_video = files.video.originalFilename;
            var num = 0;
            var check = fs.existsSync(newpath);
            while (check == true) {
            var new_number = num++;
            newfile = new_number + files.video.originalFilename;
            newpath = publicPath + newfile;
            v_video = newfile;
            check = fs.existsSync(newpath);
            }
            fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            });
        }
        if(p_image != ''){
            fields.profile_image = p_image;
        }
        if(v_video != ''){
            fields.media_path = v_video;
        }
        await db.CourseFaculty.update(fields,{
            where: {
                id: req.params.id
            }
        })
        .then( result => {        
            req.flash('warning', `Course Faculty updated ${ fields.name } successfully!`)
            resp.status(200).redirect('/course/course-faculties');
        })
        .catch(error => {
            throw new Error(error);
        })
      });
    
    
}

exports.delete = async (req, resp, next) =>{
    await db.CourseFaculty.destroy({
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