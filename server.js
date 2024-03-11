const express = require('express');
const PORT = 3000;
const { default: mongoose } = require('mongoose');
const { mongoURI } = require('./config/mongodb-config.js');
const nodemailer = require('nodemailer');
const pug = require('pug');
const { newPasswordTokenCreate } = require('./controllers/authController.js');
const bodyParser = require('body-parser');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ApiError } = require('./middleware/ApiError.js');
const config = require("./config/config.json");


mongoose.connect(mongoURI)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Failed to connect to mongo'));



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
    const html = pug.renderFile('./views/password-reset-mail.pug', { title: 'Hey', message: 'Hello there!', restorPasswordLink: `${newPasswordTokenCreate("john234_doe6@example.com")}` });

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

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.set('view engine', 'pug');

app.get('/api/auth/pass-reset', function (req, res) {
    res.render('password-reset-mail', { title: 'Hey', message: 'Hello there!' });
});

/*app.get('/api/auth/new-pass', (req, res) => {
    fs.readFile('./views/create-pass.html', 'utf8', (err, data) => {
        if (err) {
            const error = new ApiError(500, "Invalid file reading");
            return next(error);
        } else {
            data = data.replace("{{token}}", req.token);
            res.send(data);
        }
    });
});*/

app.post('/api/auth/new-pass', async (req, res, next) => {
    const newPassword = req.body.password;
    const token = req.body.token;
    const userTkn = jwt.verify(token, config.env.JWT_NEW_PASSW_SECRET);
    const userDb = await UserUtils.findUserByid(userTkn.id);
    if (!userDb) {
        return new ApiError(400, "Token format problem.");
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    try {
        await UserModel.update({
            id: user.id,
            password: hashedPassword,
        });
        res.send('password was changed succsessfuly!');
    } catch (error) {
        const err = new ApiError(500, "error writing file to db");
        return next(err);
    }
});

const authRoutes = require('./routes/authRoutes.js');
const { validationRoutes } = require('./validationRoutes.js');
const { errorHandler } = require('./middleware/errorMiddleware.js');
const { passport } = require('./middleware/passport-middleware.js');
//const { sequelize } = require('./config/squelize-config.js');
const { postRouter } = require('./routes/postRouter.js');
const { userRouter } = require('./routes/userRouter.js');
const { UserUtils } = require('./MongoDBModels/User.js');

app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/', userRouter);
app.use('/validate', validationRoutes);
app.use((req, res, next) => next(new ApiError(404, 'Route not found.')));

app.use(errorHandler);



// sequelize.sync().then(() => console.log('db is ready'))

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});

