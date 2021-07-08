const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 2525,
    auth: {
        user: 'oyatilloabdulazizov99@gmail.com',
        pass: '+998997226765'
    },
},{
    from: 'Admin <oyatilloabdulazizov99@gmail.com>'
});


const sendEmail = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        // console.log('Email is sent', info)
    })
}

module.exports =  sendEmail