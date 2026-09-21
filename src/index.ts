import * as http from 'http';



function matchRoutes(){
    
}

const server = http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.method);
    
    res.statusCode = 200;
    res.setHeader("Content-Type","text/plain");
    res.write("Hello user!");
    res.end("Close.");
    
});

server.listen(3000,()=>console.log("The server is Live on port 3000!"));