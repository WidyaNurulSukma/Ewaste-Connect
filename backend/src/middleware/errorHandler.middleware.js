// Error handling middleware

const errorHandler = (req, res, next) => {
  res.status(404).json({ error: 'URL not found' });
};

module.exports = errorHandler;
