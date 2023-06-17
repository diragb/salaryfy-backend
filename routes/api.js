const express = require('express');
const { check, body } = require('express-validator');
const db = require('../models');

//Middlewares
const isAuth = require('../app/Http/Middleware/API/authMiddleware');

//Controllers
const AuthController = require('../app/Http/Controllers/API/AuthController');
const EligiblityController = require('../app/Http/Controllers/API/EligiblityController');
const EligiblityTestController = require('../app/Http/Controllers/API/EligiblityTestController');
const ScholarshipTestController = require('../app/Http/Controllers/API/ScholarshipTestController');
const CourseController = require('../app/Http/Controllers/API/CourseController');
const RazorpayController = require('../app/Http/Controllers/API/RazorpayController');
const UserController = require('../app/Http/Controllers/API/UserController');
const ContactController = require('../app/Http/Controllers/API/ContactController');
const DirectPlacementController = require('../app/Http/Controllers/API/DirectPlacementController');
// const SMSController = require('../app/Http/Controllers/API/SendSMSController');



const route = express.Router();

//Auth routes

route.post('/api/login', 
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
.bail() , AuthController.login);

route.post('/api/generate-otp', 
 body('phone')
.not()
.isEmpty()
.withMessage('Phone is required!')
.bail() , AuthController.generateOtp);

route.post('/api/otp-login', 
 body('phone')
.not()
.isEmpty()
.withMessage('Phone is required!')
.bail(),
 body('otp')
.not()
.isEmpty()
.withMessage('OTP is required!')
.bail() , AuthController.otpLogin);

route.post('/api/register',
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
    ,AuthController.register);

    route.get('/api/welcome',isAuth, AuthController.welcome);


//User Routes
route.post('/api/check-user', 
 body('email')
.not()
.isEmpty()
.withMessage('Email is required!')
.bail()
.custom(value => {
    return db.UserDetails.findOne({ where : {email:value}}).then(user => {
        if (user) {
            return Promise.reject('E-mail already in use');
        }   
    });
})
.bail(),
body('name')
.not()
.isEmpty()
.withMessage('name is required!')
.bail() , EligiblityController.store);

route.get('/api/college-search', EligiblityController.collegeSearch);
// route.get('/api/send-msg', SMSController.testMsg);

//user profile
route.post('/api/update-profile',isAuth, UserController.updateUserDetails);
route.get('/api/get-profile',isAuth, UserController.getUserDetails);
route.get('/api/get-process',isAuth, UserController.getProcess);
route.post('/api/document-upload',isAuth, UserController.documentFileUpload);



route.post('/api/eligiblity-form',
body('name')
.not()
.isEmpty()
.withMessage('Name is required!')
.bail(),
body('email')
.not()
.isEmpty()
.withMessage('Email is required!')
.bail()
.custom(value => {
    return db.UserDetails.findOne({ where : {email:value}}).then(user => {
        if (user) {
            return Promise.reject('E-mail already in use');
        }   
    });
})
.bail(),
body('graduation_score')
.optional()
.trim()
.isFloat()
.withMessage('Graduation Score is must be Float!')
.bail(),
body('type')
.not()
.isEmpty()
.withMessage('Type is required!')
.bail() , EligiblityController.FormDataSave);

route.get('/api/test-questions', EligiblityTestController.getQuestions);
route.get('/api/test-count', EligiblityTestController.getEligibiltyCount);
route.get('/api/visitor-count', EligiblityTestController.getVisitorCount);
route.get('/api/store-visitor-count', EligiblityTestController.createVisitorCount);
route.post('/api/submit-test',isAuth, EligiblityTestController.submitEligiblityTest);

// contact
route.post('/api/store-contact', ContactController.storeContact);

// scholarship test
route.get('/api/scholarship-test-questions/:id', isAuth, ScholarshipTestController.getQuestions);
route.post('/api/scholarship-test-submit', isAuth, ScholarshipTestController.submitScholarshipTest);
route.get('/api/scholarship-test-report', isAuth, ScholarshipTestController.ScholarshipTestReport);
route.get('/api/scholarship-test-count', isAuth, ScholarshipTestController.ScholarshipTestCount);


//get course
route.get('/api/course-details/:id',isAuth, CourseController.getCourseDetails);
route.get('/api/course-features',isAuth, CourseController.getCourseFeatures);
route.get('/api/course-click/:id',isAuth, CourseController.CourseClick);

//Direct Placement 
route.post('/api/direct-placement-store-details',isAuth, DirectPlacementController.storeDetails);



route.post('/api/payment/orders',
body('amount')
.not()
.isEmpty()
.withMessage('Amount is required!'),
body('type')
.not()
.isEmpty()
.withMessage('Type is required!')
.bail(),isAuth, RazorpayController.orders);

route.post('/api/payment/verify',
body('razorpay_order_id')
.not()
.isEmpty()
.withMessage('Razorpay Order ID is required!')
.bail(),
body('razorpay_payment_id')
.not()
.isEmpty()
.withMessage('Razorpay Payment ID is required!')
.bail(),
body('razorpay_signature')
.not()
.isEmpty()
.withMessage('Razorpay Signature is required!')
.bail(),isAuth, RazorpayController.verify);


module.exports = route;