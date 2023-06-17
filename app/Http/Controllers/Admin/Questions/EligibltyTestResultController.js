const db = require('../../../../../models');

exports.index = async (req, resp, next) => {
    await db.EligiblityTestReport.findAll({
        include: [{
            model: db.User,
            as: 'user',
            include: {
                model: db.UserDetails,
                as: "details",
              }
          }]
    })
    .then((result) => {
        console.log(result)
        resp.render('dashboard/admin/eligiblty_test/index',{
            eligiblty_tests: result,
            pageTitle: 'Eligiblty Test'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
} 