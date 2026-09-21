import * as http from 'http';



function matchRoutes(){
    
}

const server = http.createServer((req,res)=>{

    // we safely check if not undefined for Node TS
    if(!req.url){
        return;
    }
    // we create a new object that splits url into path and params and handles edge cases of parsing
    const url = new URL(req.url , "http://localhost");
    console.log(req.method);
    console.log(url.pathname);
    console.log(url.searchParams);
    
});

server.listen(3000,()=>console.log("The server is Live on port 3000!"));