import logger from './loggerMiddleware.js';

export const errorHandler = (err, req, res, next) => {
  console.log('Unhandled error', { 
    error: err.message, 
    userId: req.meta?.user_id 
  });
  res.status(500).json({ message: 'Internal server error' });
};