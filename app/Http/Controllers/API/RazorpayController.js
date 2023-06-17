const Razorpay = require("razorpay");
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");
const db = require("../../../../models");

exports.orders = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Validation Error", errorMessage: errors.array() });
    }
    //for live
    // const instance = new Razorpay({
    // 	key_id: 'rzp_live_qKNur64qvxp1jD',
    // 	key_secret: 'tkSxqC1Dfiqan0D3zHUYUkeN',
    // });
    //for test
    const instance = new Razorpay({
      key_id: "rzp_test_ZVzgeczmpnmT1U",
      key_secret: "sdXm9TSBD79fkY6aOeDD5vTR",
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        // console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      var user_id = req.decoded.user_id;
      //transaction_type 1 for initial payment
      db.Transaction.create({
        user_id: user_id,
        transaction_type: req.body.type,
        amount: req.body.amount,
        order_id: order.id,
        payment_source: "razorpay",
        status: 0,
      })
        .then((result) => {
          res.status(200).json({ data: order });
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

exports.verify = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "sdXm9TSBD79fkY6aOeDD5vTR")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      var user_id = req.decoded.user_id;
      db.Transaction.update(
        { payment_id: razorpay_payment_id, status: 1 },
        {
          where: {
            order_id: razorpay_order_id,
          },
        }
      )
        .then((result) => {
          return res
            .status(200)
            .json({ message: "Payment verified successfully" });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};
