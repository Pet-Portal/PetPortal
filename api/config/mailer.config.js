const nodemailer = require('nodemailer');
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;
const appUrl = 'http://localhost:3000';

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user,
        pass,
    },
});

module.exports.sendValidationEmail = (email, activationToken, name) => {
    transport
        .sendMail({
            to: email,
            from: 'PetPortal Team <ironhackermodulo3@gmail.com>',
            subject: 'PetPortal activation account',
            html: `<h1>Hi ${name}</h1> <p>Click on the button below to activate your account ❤️</p> <a href="${appUrl}/activate?token=${activationToken}" style="padding: 10px 20px; color: white; background-color: pink; border-radius: 5px;">Click here</a>`
        });
};


module.exports.sendMessageEmail = (email, title, text, price, name, from, post) => {
    transport
        .sendMail({
            to: email,
            from: 'PetPortal Team <ironhackermodulo3@gmail.com>',
            subject: 'New message in your post!',
            html: `<h1>Hi ${name}</h1> <p>You got a new message from ${from} at your post: "${post}"!</p> <h3>Message:</h3> <p><b>Title: </b>${title}</p><p>Text: ${text}</p><h4>Price: ${price}€ per day`
        })
}