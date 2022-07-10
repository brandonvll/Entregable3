class AppError extends Error {
  constructor(message, statuCode) {
    super(message);

    this.message = message;
    this.statuCode = statuCode;
    this.status = `${statuCode}`.startsWith("5") ? "fail" : "error";

    Error.captureStackTrace(this, this.contructor);
  }
}

module.exports = { AppError };
