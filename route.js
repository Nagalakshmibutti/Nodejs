const fs = require('fs');  //create a file system
const requestHandler = (req, res) => {  //function used to handle the reqest and response 
    const url = req.url;            
    const method = req.method; //method means ex in form we use POST method if method is post 
    if (url === '/' ) {      //if we type url1+/ in url this code will excute
        res.write ('<html>');
        res.write ('<head><title> first server </title></head>');
        res.write ('<body><form action="/message" method= "POST"> <input type="text" name="message" ><button type="submit"> send </button></form></body>');
        res.write ('</html>'); //above line action means /message will assgin to the url after excuting the code  ex localhost:3000/message
        return res.end();  
    }
    if ( url === '/message' && method === 'POST'){  
        const body = [];
        req.on('data' , (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end' , () =>{ //why return is to excute the below code first
            const parsingBody = Buffer.concat(body).toString(); //converting entered data into string 
            const message = parsingBody.split('=')[0];   
            fs.writeFile('message.txt' , message , err => {
                res.statusCode = 302 ;    // network number is 302 port 
                res.setHeader = ('Location' , '/'); 
                return res.end();
            });
        });  
        
    }
    console.log(req.url , req.method, req.headers);
    res.write ('<html>');
    res.write ('<head><title> first server </title></head>');
    res.write ('<body><h1> hello welcome to server </h1> </body>');
    res.write ('</html>');
    res.end();
};
module.exports = requestHandler //used to export the module to anothe file 

/* different methods to exports

module.export = {
    handler : requestHandler ,
    someText : 'some hard codev '
};

module.exports.handler = requestHandler;
module.export.someText = 'some hard code ' ;

we could omit the module here 
 exports.handler = requestHandler ;
 */
