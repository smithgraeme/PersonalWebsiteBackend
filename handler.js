const AWS = require('aws-sdk');
const sns = new AWS.SNS();

const querystring = require('querystring');

module.exports.postcontactform = async (event) => {
  console.log(event);
  // console.log(JSON.stringify(event));
  //console.log(event.body);

  const parsedBody = querystring.parse(event.body);

  if ((parsedBody.senderName === "" && parsedBody.senderEmail === "" && parsedBody.emailBody === "") || (parsedBody.senderName === undefined && parsedBody.senderEmail === undefined && parsedBody.emailBody === undefined)) {
      console.log("Blank form submissions");
  }
  else {

      const params = {
          Message: "From: " + parsedBody.senderName + " (" + parsedBody.senderEmail + ")" + "\n\n" + parsedBody.emailBody,
          Subject: 'Email from personal website contact form',
          TopicArn: process.env.snsTopic
      };

      await sns.publish(params).promise();
  }

  const response = {
      "headers": {
          "Access-Control-Allow-Origin": "*",
      }
  };

  return response;
};
