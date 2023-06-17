const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../../../models");
const moment = require("moment");

exports.login = async (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(422)
      .json({ message: "Validation Error", errorMessage: errors.array() });
  }
  await db.User.findOne({
    where: {
      email: req.body.email,
    },
    include: {
      model: db.Role,
      as: "roles",
    },
  })
    .then((user) => {
      if (!user) {
        return resp
          .status(422)
          .json({ message: "User not found. Please sign up!" });
      }
      let roles = user.roles.map((roles) => {
        return roles.name;
      });
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (!result) {
          return resp.status(422).json({ message: "Invalid Credentials" });
        }
        var name = user.name;
        var email = user.email;

        let payload = {
          auth: true,
          name: user.name,
          email: user.email,
        };

        let accessToken = jwt.sign(payload, "longest secreate key node admin", {
          algorithm: "HS256",
          expiresIn: "1h",
        });

        return resp
          .status(200)
          .json({ name: name, email: email, jwt: accessToken });
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
};

exports.generateOtp = async (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(422)
      .json({ message: "Validation Error", errorMessage: errors.array() });
  }
  await db.User.findOne({
    where: {
      phone: req.body.phone,
    },
  }).then((user) => {
    if (!user) {
      var otp = 1234;
      var now = moment().add(5, "minutes");

      db.User.create({
        name: "User",
        phone: req.body.phone,
        otp: otp,
        expire_at: now,
      }).then((result) => {
        return resp
          .status(200)
          .json({ message: "OTP has been sent on Your Mobile Number" });
      });
    } else {
      var otp = 1234;
      var now = moment().add(5, "minutes");
      db.User.update(
        {
          otp: otp,
          expire_at: now,
        },
        {
          where: {
            phone: req.body.phone,
          },
        }
      )
        .then((result) => {
          return resp
            .status(200)
            .json({ message: "OTP has been sent on Your Mobile Number" });
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  });
};

exports.otpLogin = async (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(422)
      .json({ message: "Validation Error", errorMessage: errors.array() });
  }
  await db.User.findOne({
    where: {
      phone: req.body.phone,
      otp: req.body.otp,
    },
  })
    .then(async (user) => {
      var now = moment();
      if (!user) {
        return resp.status(422).json({ message: "Your Otp is not correct" });
      } else if (user && moment(now).isAfter(user.expire_at)) {
        return resp.status(422).json({ message: "Your OTP has been expired" });
      }
      if (req.body.otp == user.otp) {
        if (req.body.email) {
          await db.UserDetails.findOne({
            where: {
              // email: req.body.email,
              user_id: user.id
            },
          })
            .then(async (user_details) => {
              if (!user_details) {
                await db.UserDetails.update(
                  { user_id: user.id },
                  {
                    where: {
                      email: req.body.email,
                    },
                  }
                );
              }
              var name = user.name;
              var phone = user.phone;
              let payload = {
                name: user.name,
                phone: user.phone,
                user_id: user.id,
              };

              let accessToken = jwt.sign(
                payload,
                "longest secreate key node admin",
                {
                  algorithm: "HS256",
                  expiresIn: "8h",
                }
              );

              return resp
                .status(200)
                .json({ name: name, phone: phone, jwt: accessToken });
            })
            .catch((error) => {
              throw new Error(error);
            });

          // await db.UserDetails.update(
          //   { user_id: user.id },
          //   {
          //     where: {
          //       email: req.body.email,
          //     },
          //   }
          // ).then( async update =>{
          //   var name = user.name;
          //   var phone = user.phone;
          //   let payload = {
          //     name: user.name,
          //     phone: user.phone,
          //     user_id: user.id,
          //   };

          //   let accessToken = jwt.sign(payload, "longest secreate key node admin", {
          //     algorithm: "HS256",
          //     expiresIn: "8h",
          //   });

          //   return resp
          //     .status(200)
          //     .json({ name: name, phone: phone, jwt: accessToken });
          // })
        } else {
          var name = user.name;
          var phone = user.phone;
          let payload = {
            name: user.name,
            phone: user.phone,
            user_id: user.id,
          };

          let accessToken = jwt.sign(
            payload,
            "longest secreate key node admin",
            {
              algorithm: "HS256",
              expiresIn: "8h",
            }
          );

          return resp
            .status(200)
            .json({ name: name, phone: phone, jwt: accessToken });
        }
      } else {
        return resp.status(422).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

exports.register = async (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(422)
      .json({ message: "Validation Error", errorMessage: errors.array() });
  }

  await bcrypt
    .hash(req.body.password, 12)
    .then((passwordHash) => {
      db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
      })
        .then((result) => {
          db.UserHasRole.create({
            UserId: result.id,
            RoleId: 2,
          });
          var name = result.name;
          var email = result.email;

          let payload = {
            auth: true,
            name: result.name,
            email: result.email,
          };

          let accessToken = jwt.sign(
            payload,
            "longest secreate key node admin",
            {
              algorithm: "HS256",
              expiresIn: "1h",
            }
          );

          return resp.json({ name: name, email: email, jwt: accessToken });
        })
        .catch((error) => {
          throw new Error(error);
        });
    })
    .catch((error) => {
      throw new Error(error);
    });
};

exports.welcome = (req, resp, next) => {
  return resp.status(200).json({ message: "successfully auth check" });
};
