const mongoose = require('mongoose');


const connect = mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true , useUnifiedTopology: true});

const connection = mongoose.connection;

connection.on('error',err => console.log('Db not connected'))

connection.on('connected',() => console.log('MongoDb connection successful'))


