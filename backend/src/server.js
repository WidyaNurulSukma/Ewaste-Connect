const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URL } = require('./config/secrets.config');
const errorHandler = require('./middleware/errorHandler.middleware');
const logger = require('./middleware/log.middleware');
const authRouter = require('./auth/auth.route');
const statusRouter = require('./routes/status.route');
const supportRouter = require('./routes/support.route.js');
const userRouter = require('./routes/user.route');
const orderRouter = require('./routes/orders.route');

const app = express();
app.use(cors());

app.use(express.json());
app.use(logger);
app.use('/api/v1/status/', statusRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/support', supportRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);

// the error handler has to be the very last middleware
app.use(errorHandler);

// Tambahkan penanganan error untuk koneksi MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Keluar jika koneksi gagal
  });

module.exports = app;