// utils/sendMail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "gassma803@gmail.com",
        pass: "pqxjnzktmfgfjkrd",
    },
});

async function sendMail({ from, to, subject, text }) {
    return transporter.sendMail({ from, to, subject, text });
}

module.exports = sendMail;
