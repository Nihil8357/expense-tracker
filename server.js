const express = require("express");
const env = require('dotenv').config();
const dbConnect = require('./dbConnect');
const { route } = require("./routes/usersRoutes");
const app = express();
const port = 5000;

const userRouter = require("./routes/usersRoutes")
const transactionRouter = require('./routes/transsactionRoutes');

app.get('/', (req,res) => res.send('Hello World'));

app.use(express.json());

app.use('/api/users', userRouter)
app.use('/api/transactions', transactionRouter)

app.listen(port, () => console.log('Node js server started at ',+ port));