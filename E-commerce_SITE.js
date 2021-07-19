
const path = require("path");
const express = require('express'); //checking for route.js file in os
const bodyParser = require('body-parser');  // read the body of the html files
//const expressHbs = require ('express-handlebars'); //express handlebar@ instead of pug files
const errorController = require ('./controllers/error');

// below line used to deal with mysql
const db = require('./utill/database');

const app= express();

// adding controllers to 404 file



// express handlerbar Templating engine
/*app.engine('hbs' , expressHbs( 
                            { LayoutsDir : 'views/layouts' , //directing the file to views folder
                             defaultLayout : 'main-layout', //putting defalut layout main-layout.hbs file
                            extname : 'hbs' //to know this file uses hbs layout
                            }));
app.set('view engine' , 'hbs'); //adding handlebar file*/


//adding EJF Template 
app.set ('view engine' , 'ejs');
//app.set('view engine' , 'views'); //adding pug modules 
app.set('views' ,'views'); //accessing the html files from views folder

//Used to access Products from admin.js file NO NEED WHILE USING CONTROLLERS const adminData = require("./routes/admin");  //used to import admin.js file into this file
const adminRoute = require("./routes/admin");  //used to import admin.js file into this file
const shopRoute = require ("./routes/shop");   //used to import shop.js file into this file

db.execute('SELECT * FROM products')
.then(result => {
    console.log(result[0], result[1]);
   
})
.catch( err => {
    console.log(err);
}); 

app.use(bodyParser.urlencoded({extended:false})); 
app.use(express.static(path.join(__dirname ,'public'))); //used to attach the css files in the html file

 app.use('/',adminRoute);  //attaching the admin.js file to express() in this file 
 app.use(shopRoute); //attaching the shop.js file to express() in this file 

 //Used to access Products from admin.js file NO NEED WHILE USING CONTROLLERS app.use('/', adminData.routes);


app.use(errorController.errorPage);

/* IT NOT USEFUL WHILE USING CONTROLLERS app.use((req , res , next)=>{
    //res.status(404).sendFile(path.join(__dirname , 'views' , '404.html'));
       // res.status(404).send("<h1> Page not founrd </h1>");   
       res.status(404).render('404' ,{ pageTitle : 'Page not found'}); // adding pug file path==2view/404.pug
});*/

app.listen(8000);  //this server will listen in 3000 port


/*app.use('/', (req,res,next)=>{
    console.log("this is first statement");
    next(); // if next() not used then below methods could not execute
   
});*/

/*app.use((req,res, next ) =>{
    console.log(" middle ware -2");

});*/