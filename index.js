const express = require('express');
const mongoose = require('mongoose')
const app = express();


mongoose.connect("mongodb+srv://MERN123:admin123@cluster0.elnly.mongodb.net/learn_node");

const userSchema = new mongoose.Schema({
      name: String,
      age: Number,
})
const userModel = mongoose.model('emp',userSchema);
app.listen('3001',()=>{
    console.log('Server is running!..');
})