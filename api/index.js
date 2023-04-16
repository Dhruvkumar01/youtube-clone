const express = require('express')
const mongoose= require('mongoose')
const dotenv= require('dotenv')
dotenv.config();

const app= express();

mongoose.connect(process.env.MONGO_DB)
    .then(()=> {
        console.log("DB is connected");
    })
    .catch(err =>{
        console.log(err);
    })

app.get('/', (req, res)=>{
    res.send("hello world")
});

const port= process.env.PORT;

app.listen(port, ()=>{
    console.log(`app is conected on ${port}`);
})