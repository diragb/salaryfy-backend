const db = require('../../../../../models');

exports.index = async (req, resp, next) => {
    await db.ScholarshipTestReport.findAll({
        include: [{
            model: db.User,
            as: 'user',
            include: {
                model: db.UserDetails,
                as: "details",
              }
          },
          {model: db.Course,
            as: 'course',
        }]
    })
    .then((result) => {
        resp.render('dashboard/admin/scholarship_test_result/index',{
            scholarship_tests: result,
            pageTitle: 'Scholarship Test'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
} 