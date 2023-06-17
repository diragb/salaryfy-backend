const express = require('express');
const { check, body } = require('express-validator');
const db = require('../models');

//Middlewares
const isAuth = require('../app/Http/Middleware/authMiddleware');
const isLoggedIn = require('../app/Http/Middleware/isUserLoggedIn');
const role = require('../app/Http/Middleware/validateRoleMiddleware');

//Controllers
const homeController = require('../app/Http/Controllers/HomeController');
const loginController = require('../app/Http/Controllers/Auth/LoginController');
const registerController = require('../app/Http/Controllers/Auth/RegisterController');
const userController = require('../app/Http/Controllers/Admin/Users/UserController');
const roleController = require('../app/Http/Controllers/Admin/Roles/RoleController');
const questionController = require('../app/Http/Controllers/Admin/Questions/QuestionController');
const mediaQuestionController = require('../app/Http/Controllers/Admin/Questions/MediaQuestionController');
const onlyQuestionController = require('../app/Http/Controllers/Admin/Questions/OnlyQuestionMediaController');
const eligibltyResultController = require('../app/Http/Controllers/Admin/Questions/EligibltyTestResultController');
const scholarshipResultController = require('../app/Http/Controllers/Admin/ScholarshipTest/ScholarshipTestResultController');
const courseCategoryController = require('../app/Http/Controllers/Admin/Course/CategoryController');
const courseController = require('../app/Http/Controllers/Admin/Course/CourseController');
const courseTermController = require('../app/Http/Controllers/Admin/Course/CourseTermController');
const courseTermTopicController = require('../app/Http/Controllers/Admin/Course/CourseTermDetailsController');
const courseJobRoleController = require('../app/Http/Controllers/Admin/Course/CourseJobRoleController');
const courseFeaturesController = require('../app/Http/Controllers/Admin/Course/CourseFeatureController');
const courseFacultyController = require('../app/Http/Controllers/Admin/Course/CourseFacultyController');
const scholarshipTestController = require('../app/Http/Controllers/Admin/ScholarshipTest/ScholarshipTestController');



const route = express.Router();

//Auth routes
route.get('/login', isLoggedIn, loginController.index);

route.post('/login', 
 body('email')
.not()
.isEmpty()
.withMessage('Email is required!')
.bail()
.isEmail()
.withMessage('Enter Valid Email!')
.bail(),
 body('password')
.not()
.isEmpty()
.withMessage('Password is required!')
.bail() , isLoggedIn, loginController.login);

route.post('/logout', loginController.logout);
// route.get('/register', isLoggedIn,registerController.index);

// route.post('/register',
//         body('name')
//         .not()
//         .isEmpty()
//         .withMessage('Name is required!')
//         .bail()
//         .isLength({min: 5})
//         .withMessage('Name must 5 charcters long!')
//         .bail(),
//         body('email')
//         .not()
//         .isEmpty()
//         .withMessage('Email is required!')
//         .bail()
//         .isEmail()
//         .withMessage('Enter Valid Email!')
//         .bail()
//         .custom(value => {
//             return db.User.findOne({ where : {email:value}}).then(user => {
//                 if (user) {
//                     return Promise.reject('E-mail already in use');
//                 }   
//             });
//         })
//         .bail(),
//         body('password')
//         .not()
//         .isEmpty()
//         .withMessage('Password is required!')
//         .bail() 
//         .isLength({min: 5})
//         .withMessage('Password is minimum 5 charcters long!')
//         .bail()    
//     ,registerController.register);


//Auth Routes
route.get('/home', isAuth ,homeController.home);

//Admin Routes

//Questions
route.get('/question/create',isAuth ,role.validateRole("admin"),questionController.create);
route.post('/question/update/:id',isAuth,role.validateRole("admin"),questionController.update);
route.get('/question/edit/:id',isAuth,role.validateRole("admin"),questionController.edit);
route.post('/question/delete/:id',isAuth,role.validateRole("admin"),questionController.delete);
route.post('/question/store',isAuth ,role.validateRole("admin"),questionController.store);
route.get('/questions',isAuth, role.validateRole("admin"),questionController.index);

//Media Questions
route.get('/media-question/create',isAuth ,role.validateRole("admin"), mediaQuestionController.create);
route.post('/media-question/update/:id',isAuth,role.validateRole("admin"), mediaQuestionController.update);
route.get('/media-question/edit/:id',isAuth,role.validateRole("admin"), mediaQuestionController.edit);
route.post('/media-question/store',isAuth ,role.validateRole("admin"), mediaQuestionController.store);

//Only Media Questions
route.get('/only-question/create',isAuth ,role.validateRole("admin"), onlyQuestionController.create);
route.post('/only-question/update/:id',isAuth,role.validateRole("admin"), onlyQuestionController.update);
route.get('/only-question/edit/:id',isAuth,role.validateRole("admin"), onlyQuestionController.edit);
route.post('/only-question/store',isAuth ,role.validateRole("admin"), onlyQuestionController.store);

//Course Category
route.get('/course/category/create',isAuth ,role.validateRole("admin"), courseCategoryController.create);
route.post('/course/category/update/:id',isAuth,role.validateRole("admin"), courseCategoryController.update);
route.get('/course/category/edit/:id',isAuth,role.validateRole("admin"), courseCategoryController.edit);
route.post('/course/category/delete/:id',isAuth,role.validateRole("admin"), courseCategoryController.delete);
route.post('/course/category/store',isAuth ,role.validateRole("admin"), courseCategoryController.store);
route.get('/course/categories',isAuth, role.validateRole("admin"), courseCategoryController.index);

//Course
route.get('/course/create',isAuth ,role.validateRole("admin"), courseController.create);
route.post('/course/update/:id',isAuth,role.validateRole("admin"), courseController.update);
route.get('/course/edit/:id',isAuth,role.validateRole("admin"), courseController.edit);
route.post('/course/delete/:id',isAuth,role.validateRole("admin"), courseController.delete);
route.post('/course/store',isAuth ,role.validateRole("admin"), courseController.store);
route.get('/courses',isAuth, role.validateRole("admin"), courseController.index);

//Course Term
route.get('/course/term/create',isAuth ,role.validateRole("admin"), courseTermController.create);
route.post('/course/term/update/:id',isAuth,role.validateRole("admin"), courseTermController.update);
route.get('/course/term/edit/:id',isAuth,role.validateRole("admin"), courseTermController.edit);
route.post('/course/term/delete/:id',isAuth,role.validateRole("admin"), courseTermController.delete);
route.post('/course/term/store',isAuth ,role.validateRole("admin"), courseTermController.store);
route.get('/course/terms',isAuth, role.validateRole("admin"), courseTermController.index);

//Course Term Topic
route.get('/course/term-topic/create',isAuth ,role.validateRole("admin"), courseTermTopicController.create);
route.post('/course/term-topic/update/:id',isAuth,role.validateRole("admin"), courseTermTopicController.update);
route.get('/course/term-topic/edit/:id',isAuth,role.validateRole("admin"), courseTermTopicController.edit);
route.post('/course/term-topic/delete/:id',isAuth,role.validateRole("admin"), courseTermTopicController.delete);
route.post('/course/term-topic/store',isAuth ,role.validateRole("admin"), courseTermTopicController.store);
route.get('/course/term-topics',isAuth, role.validateRole("admin"), courseTermTopicController.index);

//Course job roles
route.get('/course/job-role/create',isAuth ,role.validateRole("admin"), courseJobRoleController.create);
route.post('/course/job-role/update/:id',isAuth,role.validateRole("admin"), courseJobRoleController.update);
route.get('/course/job-role/edit/:id',isAuth,role.validateRole("admin"), courseJobRoleController.edit);
route.post('/course/job-role/delete/:id',isAuth,role.validateRole("admin"), courseJobRoleController.delete);
route.post('/course/job-role/store',isAuth ,role.validateRole("admin"), courseJobRoleController.store);
route.get('/course/job-roles',isAuth, role.validateRole("admin"), courseJobRoleController.index);

//Course features
route.get('/course/features/create',isAuth ,role.validateRole("admin"), courseFeaturesController.create);
route.post('/course/features/update/:id',isAuth,role.validateRole("admin"), courseFeaturesController.update);
route.get('/course/features/edit/:id',isAuth,role.validateRole("admin"), courseFeaturesController.edit);
route.post('/course/features/delete/:id',isAuth,role.validateRole("admin"), courseFeaturesController.delete);
route.post('/course/features/store',isAuth ,role.validateRole("admin"), courseFeaturesController.store);
route.get('/course/features',isAuth, role.validateRole("admin"), courseFeaturesController.index);

//Course Faculty
route.get('/course/course-faculty/create',isAuth ,role.validateRole("admin"), courseFacultyController.create);
route.post('/course/course-faculty/update/:id',isAuth,role.validateRole("admin"), courseFacultyController.update);
route.get('/course/course-faculty/edit/:id',isAuth,role.validateRole("admin"), courseFacultyController.edit);
route.post('/course/course-faculty/delete/:id',isAuth,role.validateRole("admin"), courseFacultyController.delete);
route.post('/course/course-faculty/store',isAuth ,role.validateRole("admin"), courseFacultyController.store);
route.get('/course/course-faculties',isAuth, role.validateRole("admin"), courseFacultyController.index);

//Scholarship Test
route.get('/scholarship-test/create/:id',isAuth ,role.validateRole("admin"),scholarshipTestController.create);
route.post('/scholarship-test/update/:id',isAuth,role.validateRole("admin"),scholarshipTestController.update);
route.get('/scholarship-test/edit/:id',isAuth,role.validateRole("admin"),scholarshipTestController.edit);
route.post('/scholarship-test/delete/:id',isAuth,role.validateRole("admin"),scholarshipTestController.delete);
route.post('/scholarship-test/store',isAuth ,role.validateRole("admin"),scholarshipTestController.store);
route.get('/scholarship-test/:course_id',isAuth, role.validateRole("admin"),scholarshipTestController.index);

//Roles
route.get('/role/create',isAuth ,role.validateRole("admin"), roleController.create);
route.post('/role/update/:id',isAuth,role.validateRole("admin"), roleController.update);
route.get('/role/edit/:id',isAuth,role.validateRole("admin"), roleController.edit);
route.post('/role/delete/:id',isAuth,role.validateRole("admin"), roleController.delete);
route.post('/role/store',isAuth ,role.validateRole("admin"), roleController.store);
route.get('/roles',isAuth, role.validateRole("admin"), roleController.index);

//Eligiblty Test 
route.get('/eligiblty-test-result',isAuth, role.validateRole("admin"), eligibltyResultController.index);

//Scholarship Test 
route.get('/scholarship-test-result',isAuth, role.validateRole("admin"), scholarshipResultController.index);


//Users
route.get('/user/create',isAuth , role.validateRole("admin"), userController.create);
route.post('/user/update/:id',isAuth, role.validateRole("admin"), userController.update);
route.get('/user/edit/:id',isAuth, role.validateRole("admin"), userController.edit);
route.post('/user/delete/:id',isAuth, role.validateRole("admin"), userController.delete);
route.post('/user/store',
body('name')
.not()
.isEmpty()
.withMessage('Name is required!')
.bail()
.isLength({min: 5})
.withMessage('Name must 5 charcters long!')
.bail(),
body('email')
.not()
.isEmpty()
.withMessage('Email is required!')
.bail()
.isEmail()
.withMessage('Enter Valid Email!')
.bail()
.custom(value => {
    return db.User.findOne({ where : {email:value}}).then(user => {
        if (user) {
            return Promise.reject('E-mail already in use');
        }   
    });
})
.bail(),
body('password')
.not()
.isEmpty()
.withMessage('Password is required!')
.bail() 
.isLength({min: 5})
.withMessage('Password is minimum 5 charcters long!')
.bail()    
,isAuth, role.validateRole("admin") ,userController.store);
route.get('/users', isAuth, role.validateRole("admin"), userController.index);


//User Routes

//Home Page routes
route.get('/',homeController.welcome);


module.exports = route;