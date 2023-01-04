const { CourierClient } = require("@trycourier/courier")

const courier = CourierClient(); // creates the client and uses the COURIER_AUTH_TOKEN env variable as authorization

// welcome email sent to the user 
async function welcome(user) {
    const { requestId } = await courier.send({
        message: {
          to: {
            data: {
              name: user.firstName
            },
            email: user.email,
          },
          content: {
            title: "Welcome to your classroom, {{name}}!",
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

}

async function passwordReset(user) {
  
}

