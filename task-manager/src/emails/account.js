const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

sgMail.send({
    to: "spl.ivalis@gmail.com",
    from: "spl.ivalis@gmail.com",
    subject: "test email",
    text: "this is a test"
})