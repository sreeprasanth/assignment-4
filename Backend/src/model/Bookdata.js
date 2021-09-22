const mongoose = require('mongoose');  // requiring code of mongoose

mongoose.connect('mongodb+srv://userone:userone@fsd.j8mfm.mongodb.net/library?retryWrites=true&w=majority');   // connection code to database

const Schema = mongoose.Schema;   // ACESSING SCHEMA FROM THE MONGOOSE PACKAGE AND STORED IT IN A VARIABLE

const NewBookSchema = new Schema({

bookName:String,
bookAuthor:String,
bookGenre:String,
bookDescription:String,
bookUrl:String

});   // using constuctor function we can create an instance of schema to define our document structure

var Book = mongoose.model('Book',NewBookSchema);  // creation of model and stored it into a variable inorder to acessing it to diffrent files for creating instance thereby adding the documents in to the collection

module.exports = Book // export the model in to other files for creating instances to store the documents.

