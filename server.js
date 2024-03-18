const express = require('express');
const PORT = 3000;
const { default: mongoose } = require('mongoose');
const { mongoURI } = require('./config/mongodb-config.js');
const bodyParser = require('body-parser');
const { ApiError } = require('./middleware/ApiError.js');
const resetPasswordRouter = require('./routes/resetPasswordRouter.js');
const authRoutes = require('./routes/authRoutes.js');
// const { validationRoutes } = require('./validationRoutes.js');
const { errorHandler } = require('./middleware/errorMiddleware.js');
const { passport } = require('./middleware/passport-middleware.js');
const { postRouter } = require('./routes/postRouter.js');
const userRoutes = require('./routes/usersRouter.js');
//const { sequelize } = require('./config/squelize-config.js');

mongoose.connect(mongoURI)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Failed to connect to mongo'));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'pug');
app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/', resetPasswordRouter);
// app.use('/validate', validationRoutes);
app.use(postRouter, userRoutes);
app.use((req, res, next) => next(new ApiError(404, 'Route not found.')));
app.use(errorHandler);
// sequelize.sync().then(() => console.log('db is ready'))

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});

