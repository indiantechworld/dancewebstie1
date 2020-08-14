const express = require('express'); // import express modules
const path = require('path'); // import path modules
const app = express(); // import app modules
const mongoose = require('mongoose');
const bodyparser = require('body-parser'); // Bodyparser is a middleware 
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 80;

// Define Mongoose Schema  (Mongoos schema is realted to MySql table schema)
var contactSchema = new mongoose.Schema({
   name: String,
   phone: String,
   email: String,
   address: String,
   desc: String
 });

var contact = mongoose.model('contact', contactSchema);


// EXPRESS SPACIFIC STUFF
app.use('/static', express.static('static')) // For Serving static files
app.use(express.urlencoded()) // it helps to bring conttact form data to the Express

// PUG SPACIFIC STUFF
app.set('view engine', 'pug') //set the template engine as PUG 
app.set('views', path.join(__dirname, 'views')) // Set the Views directory

// END POINTS
app.get("/", (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params)
 })

 
app.get("/contact", (req, res) =>{
   const params = { }
   res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) =>{
   var myData = new contact(req.body);
   myData.save().then(() =>{
      res.send("This item have been saved to Database")
   }).catch(()=>{
      res.status(400).send("Item was not saved to the Database")
   });
   // res.status(200).render("contact.pug", params);
})

 // START THE SERVER
 app.listen(port, () => {
    console.log(`This application started successfully on port ${port}`);
 });

