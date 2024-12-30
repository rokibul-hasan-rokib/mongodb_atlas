const dotenv = require('dotenv')
const colors = require('colors')
const app  = require('./app')

dotenv.config({path: "./config/.env"});

app.listen(process.env.PORT, async() =>{
    console.log(`Server is  running on http://localhost:${process.env.PORT}`.bgMagenta);
})