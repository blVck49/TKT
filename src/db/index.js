const mongoose = require('mongoose');
require('dotenv').config();

const{DATABASE_URL} = process.env;
const dbUrl = DATABASE_URL;

// Create connection to mongoDb
const createDbConnection = () => { 
    mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));
}
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


module.exports = createDbConnection;