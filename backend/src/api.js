const { PORT } = require('./config/secrets.config');
const app = require('./server');

app.listen(PORT || 5001, () => console.log(`Server is running on port ${PORT || 5001}`));