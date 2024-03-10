const express = require('express');
const PORT = 3000;
const { default: mongoose } = require('mongoose');
const { mongoURI } = require('./config/mongodb-config.js');
const nodemailer =require ('nodemailer');
const pug =require ('pug');
const { newPasswordTokenCreate } = require('./controllers/authController.js');




const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "gennady.berg@gmail.com",
        pass: "lnprcjcxddnrqajs",
    },
});

async function main() {
    // send mail with defined transport object
    const html = pug.renderFile('./views/password-reset-mail.pug', { title: 'Hey', message: 'Hello there!', restorPasswordLink:`${await newPasswordTokenCreate("john234_doe6@example.com")}`});

    // console.log({ html })

    const info = await transporter.sendMail({
        from: '', // sender address
        to: "snack.uventa@gmail.com", // list of receivers
        subject: "Hello test", // Subject line
        text: "password : generate new password() ", // plain text body
        html: html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
main().catch(console.error)
const app = express();



app.use(express.json());

app.set('view engine', 'pug');

app.get('/api/auth/pass-reset', function (req, res) {
  res.render('password-reset-mail', { title: 'Hey', message: 'Hello there!'});
});

const authRoutes = require('./routes/authRoutes.js');
const { validationRoutes } = require('./validationRoutes.js');
const { errorHandler } = require('./middleware/errorMiddleware.js');
const { ApiError } = require('./middleware/ApiError.js');
const { passport } = require('./middleware/passport-middleware.js');
//const { sequelize } = require('./config/squelize-config.js');
const { postRouter } = require('./routes/postRouter.js');
const { userRouter } = require('./routes/userRouter.js');

app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/',userRouter);
app.use('/validate', validationRoutes);
app.use((req, res ,next) => next(new ApiError(404, 'Route not found.')));

app.use(errorHandler);

mongoose.connect(mongoURI)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Failed to connect to mongo'));



// sequelize.sync().then(() => console.log('db is ready'))

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});

