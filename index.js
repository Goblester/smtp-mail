const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3010;
const email = process.env.email || '---';
const pass = process.env.pass || '---';

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: email,
        pass: pass
    }
});

app.get('/', async (req, res) => {
    res.send('hello world!');
})

app.post('/send', async (req, res) => {
    const {name, mail, message} = req.body;

    let info = await transporter.sendMail({
        from: 'HR WANTS ME',
        to: email,
        subject: 'HR WANTS ME',
        html: `<div>
            <h1>Portfolio page</h1>
            <div>
                name: ${name}
            </div>
            <div>
                mail: ${mail}
            </div>
            <div>
                ${message}
            </div>
        </div>`,
        auth: {
            user: 'goblin829@gmail.com'
        }
    });

    res.send({resultCode: 0});
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

