require('dotenv').config({ path: 'development.env' });
require('./db');
const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`[app] started on port ${port}`);
});