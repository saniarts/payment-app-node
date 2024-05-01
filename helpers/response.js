const sendSuccessRes = (res, statusCode, data, message) => {
    res.status(statusCode).json({
      success: true,
      data: data,
      message: message
    });
};
  
const sendErrorRes = (res, statusCode, errorMessage, detail) => {
    res.status(statusCode).json({
        success: false,
        error: {
            code: statusCode,
            message: errorMessage,
            detail: detail
        }
    });
};
  
module.exports = {
    sendSuccessRes,
    sendErrorRes
};