const { ApiError } = require("../middleware/ApiError")

const validator = (validationSchema) => (req, res ,next) => {
      const { body } = req
      const validationResult = validationSchema.validate(body)
      if(validationResult.error) {
          next(new ApiError(400, validationResult.error.message))
      }
      next()
  }
  
  module.exports = validator
  