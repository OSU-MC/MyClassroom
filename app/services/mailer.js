const { CourierClient } = require("@trycourier/courier")

const courier = CourierClient(); // creates the client and uses the COURIER_AUTH_TOKEN env variable as authorization
const applicationName = process.env.APP_NAME || 'MyClassroom'

// welcome email sent to the user 
async function welcome(user) {
    const { requestId } = await courier.send({
        message: {
          to: {
            data: {
              name: user.firstName,
              application: applicationName
            },
            email: user.email,
          },
          content: {
            title: "Welcome to {{application}}, {{name}}!",
            body: "Your account has successfully been created. You should expect to receive an email confirmation message shortly, which is required to activate your account",
          },
          routing: {
            method: "single",
            channels: ["email"],
          },
        },
      });
    return requestId
}

async function confirmation(user) {
  const { requestId } = await courier.send({
    message: {
      to: {
        data: {
          code: user.emailConfirmationCode,
          application: applicationName
        },
        email: user.email,
      },
      content: {
        title: "{{application}}: Account Confirmation",
        body: "Your email confirmation code is {{code}}",
      },
      routing: {
        method: "single",
        channels: ["email"],
      },
    },
  });
  return requestId
}

async function passwordReset(user) {
  const { requestId } = await courier.send({
    message: {
      to: {
        data: {
          code: user.passwordResetCode,
          application: applicationName
        },
        email: user.email,
      },
      content: {
        title: "{{application}}: Password Reset",
        body: "Your password reset code is {{code}}",
      },
      routing: {
        method: "single",
        channels: ["email"],
      },
    },
  });
  return requestId
}

module.exports = {
  welcome,
  confirmation,
  passwordReset
}
