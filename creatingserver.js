const http = require('http');
const fs = require('fs');
const server = http.createServer((req , res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/' ) {
        res.write ('<html>');
        res.write ('<head><title> first server </title></head>');
        res.write ('<body><form action="/message" method= "POST"> <input type="text" name="message" ><button type="submit"> send </button></form></body>');
        res.write ('</html>');
        return res.end();  
    }
    if ( url === '/message' && method === 'POST'){
        const body = [];
        req.on('data' , (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end' , () =>{
            const parsingBody = Buffer.concat(body).toString();
            const message = parsingBody.split('=')[1];
            fs.writeFile('message.txt' , parsingBody , err => {
                res.statusCode = 302 ;
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
});

server.listen(3000);