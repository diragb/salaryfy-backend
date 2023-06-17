const { body, validationResult } = require("express-validator");
const db = require("../../../../models");

exports.getCourseDetails = async (req, resp, next) => {
  var user_id = req.decoded.user_id;
  var user_detail = db.UserDetails.findOne({
    where: { user_id: user_id },
  }).then((user_detail) => {
    return user_detail;
  });
  var category_id =0;
  if(user_detail.edu_background == 'tech'){
    category_id = 1;
  }else{
    category_id = 2;
  }
  var course = await db.Course.findByPk(req.params.id, {
    where:{
      
    },
    include: [
      {
        model: db.CourseCurriculumTerm,
        as: "course_curriculum_term",
        include: {
          model: db.CourseCurriculumTermDetail,
          as: "curriculum_term_topic",
        },
      },
      {
        model: db.CourseJobRole,
        as: "course_job_roles",
      },
      {
        model: db.CourseFaculty,
        as: "course_faculty",
      },
    ],
  })
    .then((courses) => {
      return courses;
    })
    .catch((error) => {
      throw new Error(error);
    });
  if (course) {
    resp.status(200).json({ course: course });
  } else {
    resp.status(200).json({ message: "Course not found", course: null });
  }
};

exports.getCourseFeatures = async (req, resp, next) => {
  var courses = await db.Course.findAll({
    include: [
      {
        model: db.CourseFeature,
        as: "course_features",
      },
      {
        model: db.CourseCategory,
        as: "category",
      },
    ],
  })
    .then((courses) => {
      return courses;
    })
    .catch((error) => {
      throw new Error(error);
    });
  resp.status(200).json({ courses: courses });
};

exports.CourseClick = async (req, resp, next) => {
  var user_id = req.decoded.user_id;
  await db.CourseClickInformation.create({
    user_id:user_id,
    course_id:req.params.id
  })
    .then((courses) => {
      resp.status(200).json({ data: courses });
    })
    .catch((error) => {
      throw new Error(error);
    });
};
