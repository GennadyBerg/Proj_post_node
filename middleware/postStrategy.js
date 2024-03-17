const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../config/config.json');
const { UserModel } = require('../MongoDBModels/User');

const option = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.env.JWT_SECRET,
}

const postUseStrategy = new Strategy(option, async (payload, done) => {
      const { id } = payload
      try {
            user = await UserModel.findById(id)
            if (user) {
                  done(null, user)
            } else {
                  done(null, false)
            }
      } catch (e) {
            console.log(e)
      }
});


module.exports = {
      postUseStrategy
};
