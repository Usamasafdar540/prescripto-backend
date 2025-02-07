const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Default error response
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || null;

  // Specific error handling based on status codes
  switch (statusCode) {
    case 400:
      message = message || "Bad Request";
      break;
    case 401:
      message =
        message || "Unauthorized - Invalid credentials or token required";
      break;
    case 403:
      message = message || "Forbidden - You don't have permission";
      break;
    case 404:
      message = message || "Not Found - Resource doesn't exist";
      break;
    case 405:
      message = message || "Method Not Allowed";
      break;
    case 406:
      message = message || "Not Acceptable";
      break;
    case 408:
      message = message || "Request Timeout";
      break;
    case 409:
      message = message || "Conflict - Duplicate data or conflicting request";
      break;
    case 410:
      message = message || "Gone - Resource no longer available";
      break;
    case 415:
      message = message || "Unsupported Media Type";
      break;
    case 422:
      message = message || "Unprocessable Entity - Validation failed";
      break;
    case 429:
      message = message || "Too Many Requests - Rate limit exceeded";
      break;
    case 500:
      message = message || "Internal Server Error";
      break;
    case 502:
      message = message || "Bad Gateway";
      break;
    case 503:
      message = message || "Service Unavailable";
      break;
    case 504:
      message = message || "Gateway Timeout";
      break;
  }

  res.status(statusCode).json({
    status: false,
    message,
    errors,
  });
};

module.exports = errorHandler;
