export const errorHandler = (err, req, res, next) => {
  console.error('Server error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  res.status(statusCode).json({ 
    error: message,
    status: statusCode
  });
};

export const notFound = (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    status: 404
  });
};