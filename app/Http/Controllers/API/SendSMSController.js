const fetch = require("node-fetch");

function SendSMS (payload) {
    var static_payload = {
        userName: 'ozone_test',
        apiKey : 'KKce296de42dfecd8349231e36ecfdbbec',
        senderId: 'CALITE',
        entityId: '1201159732263115596',
        smsType: 'SMS_TRANS',
    };
    static_payload.concat(payload);
    fetch("https://smsapi1.ozonetel.com/OzonetelSMS/api.php?action=sendSMS", {
    method: "POST",
    body: JSON.stringify(static_payload),
    headers: {'Content-Type': 'application/x-www-form-urlencoded','cache-control': 'no-cache'}
  })
    .then((res) => {
      return res.text();
    })
    .catch((err) => {
      // handle error
      console.error(err);
    });
  }

exports.testMsg = async (req, resp, next) => {
    var payload = {
        templateId: '1207161803857166755',
        smsText : 'Dear Caller, currently all our executives are busy, we will get back you soon.Thank You.',
        destinationNumber: '9598818936',
    };

    SendSMS(payload)
    .then((res) => {
        return res.status(200).json({
            message: "Msg sent",
            api_responce: res,
          });
    })
    .catch((err) => {
      // handle error
      console.error(err);
    });
      
  };