class ApiError extends Error {
      constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
      }
    }

    class ForbiddenError extends ApiError {
      constructor() {
        super();
        this.statusCode = 401;
        this.message = "Forbidden";
      }
    }

module.exports = { ApiError, ForbiddenError };
    