const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('connected successfully to db');
});

mongoose.connection.on('error', (e) => {
    console.log('failed to connect to db');
    console.log(e);
});