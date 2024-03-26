const useLocalMongo = process.env.MONGO_USE_LOCAL === "true";
const env = {
  launch: {
    port: process.env.PORT,
  },
  jwt: {
    JWT_SECRET: process.env.AUTH_JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.AUTH_JWT_REFRESH_SECRET,
    JWT_NEW_PASSW_SECRET: process.env.AUTH_JWT_NEW_PASSW_SECRET,
    tokenExpiration: process.env.AUTH_TKN_EXPIR,
    newPasswordTokenExpiration: process.env.AUTH_NEWPASS_TKN_EXP,
  },
  mailer: {
    host: process.env.MAILER_CONF_HOST,
    port: process.env.MAILER_CONF_PORT,
    auth: {
      user: process.env.MAILER_CONF_AUTH_USER,
      pass: process.env.MAILER_CONF_AUTH_PASS,
    },
    overrideSendAddress: process.env.MAILER_CONF_OVR_SEND_ADDR,
  },
  mongo: {
    user: useLocalMongo ? process.env.MONGO_USERNAME :process.env.MONGO_USERNAME_REMOTE,
    pass: useLocalMongo ? process.env.MONGO_PASSWORD : process.env.MONGO_PASSWORD_REMOTE,
    host: useLocalMongo ? process.env.MONGO_HOST : process.env.MONGO_HOST_REMOTE,
    port: useLocalMongo ? process.env.MONGO_PORT : process.env.MONGO_PORT_REMOTE,
    protocol: useLocalMongo ? process.env.MONGO_PROTOCOL : process.env.MONGO_PROTOCOL_REMOTE,
    db: useLocalMongo ? process.env.MONGO_DB : process.env.MONGO_DB_REMOTE,
  },
};

module.exports = { env };
