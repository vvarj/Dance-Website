const express = require('express');
const app= express();

const path= require('path');
const port =80;

const bodyParser =require('body-parser');

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/danceContact');
}
var db =mongoose.connection;
db.on('error',console.log.bind(console,'connection error'));
db.once('open',function(){
    console.log('we are connected..');
})



//defining mongoose schema
const contactSchema = new mongoose.Schema({    //1
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });


  const Contact = mongoose.model('Contact', contactSchema);  //3
  
  

//for Express Related
app.use('/static', express.static('static'));

///body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Pug related
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));




//end points
app.get('/',(req,res)=>{
    const params={}; 
    res.status(200).render('home.pug',params);

})
app.get('/contact',(req,res)=>{
    const params={}; 
    res.status(200).render('contact.pug',params);

})


app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send('DATA STORED Successfully to database')
    }).catch(()=>{
        res.status(400).send('item cant be stored to data base')
    })

    //console.log(req.body);

   

})
//start the sever
app.listen(port,()=>{
    console.log('server running....')
})
