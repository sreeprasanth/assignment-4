const express = require('express');
const Book = require('./src/model/Bookdata.js')
const Author = require('./src/model/Authordata')
const Sign = require('./src/model/signupdata')
const cors = require('cors');  //enabling data sharing from mongodb server to angular server
// var bodyparser = require('body-parser');
 const bodyParser = require('body-parser');
var app = new express();
const jwt = require('jsonwebtoken');


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

 username="admin@gmail.com"
 password="Admin123"

function verifyToken(req,res,next){
  if(!req.headers.authorization){
    return res.status(401).send("unauthorised request")
  }
let token = req.headers.authorization.split('')[1]
if(token=='null'){
  return res.status(401).send("unauthorised request")
}
let payload=jwt.verify(token,'secretkey')
console.log(payload)
if(!payload){
  return res.status(401).send("unauthorised request")
}
req.userId=payload.subject
next()
}

app.post('/login',function(req,res){

  let userData=req.body
  
  if(username != userData.uname){
    res.status(401).send("invalid username")
  }else if(password != userData.password){
    res.status(401).send("invalid password")
 // }else{
// res.status(200).send()
//   }
// })
  }else{
    let payload = {subject:username+password};
    let token = jwt.sign(payload,'secretkey');
    res.status(200).send({token})
  }
})

app.get('/authors',function(req,res){
  res.header("Access-Control-Allow-Orgin","*") //FROM ANY SERVER WE GET THE "/products" REQUEST WE NEED TO ACCEPT IT
  res.header("Acess-Conrol-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS");  //METHODS WE ARE ACCEPTING
  Author.find()
  .then(function(books){
    res.send(books);
  }); });
  app.get('/author/:id',  (req, res) => {
  
    const id = req.params.id;
      Author.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      });
      });



      app.put('/updated',(req,res)=>{
        console.log(req.body)
        id=req.body._id,
        bookName= req.body.bookName,
        bookAuthor = req.body.bookAuthor,
        bookGenre = req.body.bookGenre,
        bookDescription = req.body.bookDescription,
        bookUrl = req.body.bookUrl
       Author.findByIdAndUpdate({"_id":id},
                                    {$set:{"bookName":bookName,
                                    "bookAuthor":bookAuthor,
                                    "bookGenre":bookGenre,
                                    "bookDescription":bookDescription,
                                    "bookUrl":bookUrl}})
       .then(function(){
           res.send();
       })
      })

      app.delete('/removed/:id',(req,res)=>{
   
        id = req.params.id;
        Author.findByIdAndDelete({"_id":id})
        .then(()=>{
            console.log('success')
            res.send();
        })
      })




app.post('/insertd',function(req,res){
  res.header("Access-Control-Allow-Orgin","*") //FROM ANY SERVER WE GET THE "/products" REQUEST WE NEED TO ACCEPT IT
  res.header("Acess-Conrol-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS"); 
  console.log(req.body);
  var book={
    
    bookName:req.body.book.bookName,
    bookAuthor:req.body.book.bookAuthor,
    bookGenre:req.body.book.bookGenre,
    bookDescription:req.body.book.bookDescription,
    bookUrl:req.body.book.bookUrl
  }
  var author = new  Author(book);
  author.save();
});



app.get('/books',function(req,res){
res.header("Access-Control-Allow-Orgin","*") //FROM ANY SERVER WE GET THE "/products" REQUEST WE NEED TO ACCEPT IT
res.header("Acess-Conrol-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS");  //METHODS WE ARE ACCEPTING
Book.find()
.then(function(books){
  res.send(books);
});
app.get('/:id',  (req, res) => {
  
  const id = req.params.id;
    Book.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    });
    });});
app.post('/insert',function(req,res){
  res.header("Access-Control-Allow-Orgin","*") //FROM ANY SERVER WE GET THE "/products" REQUEST WE NEED TO ACCEPT IT
  res.header("Acess-Conrol-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS"); 
  console.log(req.body);
  var book={
    
    bookName:req.body.book.bookName,
    bookAuthor:req.body.book.bookAuthor,
    bookGenre:req.body.book.bookGenre,
    bookDescription:req.body.book.bookDescription,
    bookUrl:req.body.book.bookUrl
  }
  var book = new Book(book);
  book.save();
});

app.delete('/remove/:id',(req,res)=>{
   
  id = req.params.id;
  Book.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      res.send();
  })
})

app.put('/update',(req,res)=>{
  console.log(req.body)
  id=req.body._id,
  bookName= req.body.bookName,
  bookAuthor = req.body.bookAuthor,
  bookGenre = req.body.bookGenre,
  bookDescription = req.body.bookDescription,
  bookUrl = req.body.bookUrl
 Book.findByIdAndUpdate({"_id":id},
                              {$set:{"bookName":bookName,
                              "bookAuthor":bookAuthor,
                              "bookGenre":bookGenre,
                              "bookDescription":bookDescription,
                              "bookUrl":bookUrl}})
 .then(function(){
     res.send();
 })
})


app.post('/signup',function(req,res){
  res.header("Access-Control-Allow-Orgin","*") //FROM ANY SERVER WE GET THE "/products" REQUEST WE NEED TO ACCEPT IT
  res.header("Acess-Conrol-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS"); 
  console.log(req.body);
  var user={
    
    username:req.body.user.username,
    password:req.body.user.password
    
  }
  var sig = new  Sign(user);
  sig.save()
});




app.listen(3000,function(){
  console.log("listening to port 3000")
});
