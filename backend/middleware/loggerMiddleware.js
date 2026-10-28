/**
 * Custom request logging middleware for Express
 * Records HTTP method, requested URL, response status code, and latency
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Listen for the finish event on the response object
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const color =
      statusCode >= 500
        ? '\x1b[31m' // Red
        : statusCode >= 400
        ? '\x1b[33m' // Yellow
        : statusCode >= 300
        ? '\x1b[36m' // Cyan
        : '\x1b[32m'; // Green
    const reset = '\x1b[0m';

    console.log(
      `[HTTP ${timestamp}] ${req.method} ${req.originalUrl} -> ${color}${statusCode}${reset} (${duration}ms)`
    );
  });

  next();
};
