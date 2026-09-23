import * as http from 'http';
import type { MethodType, RouteType,MatchRouteReturn } from './types.ts';

// Our route table
const routesL : RouteType[] = [
    {method : "GET", path : "/users/:id",handler : (req,res,params)=>console.log("GET Users handler 1")},
    {method : "GET", path : "/users",handler : (req,res,params)=>console.log("GET Users handler 2")},
    {method : "POST", path : "/user",handler : (req,res,params)=>console.log("POST Users handler 3")}
]


function isValidMethod(method : unknown):method is MethodType{
    if(typeof method !== 'string')return false;
    return ["PATCH" , "GET" , "POST" , "DELETE" , "PUT"].includes(method);
}


function matchRoute(method : MethodType, segment : string[],routes : RouteType[]): MatchRouteReturn | null{
    
    // loop over routes 
    for(const route of routes){
        if(method !== route.method)continue;
        let matched = true;
        const params : Record<string,string> = {};
        // segment each route's path 
        const localRoute = route.path.split("/").slice(1);
        // check if routes has same length (if so , they have a big chance to be valid)
        if(localRoute.length === segment.length){
             
            
            for(let i = 0;i < segment.length;i++){
                // we used ! because we already checked the length equality at outer scope
                const patternPiece = localRoute[i]!;
                const actualPiece = segment[i]!;

                // check if it is a param or static
                // param check
                if(patternPiece.startsWith(":")){
                    // store as a dictionary (ex: id : 42)
                    params[patternPiece.slice(1)] = actualPiece;

                }//static check
                else{
                    // see if segement elements has same content
                    if(patternPiece !== actualPiece){
                        matched = false;
                        break;
                    }
                    
                }

            }
            if(matched){return {route,params};}
        }
        
    }



    return null;

}



const server = http.createServer((req,res)=>{

    // we safely check if not undefined for Node TS
    if(!req.url){
        return;
    }
    // we create a new object that splits url into path and params and handles edge cases of parsing
    const url = new URL(req.url , "http://localhost");


    // temporary guard so we don't see those request appear in console 
    if(url.pathname === "/favicon.ico" || url.pathname === "/sw.js"){
        res.statusCode = 404;
        res.end("not found!");
        return;
    }


    
    const segments = url.pathname.split("/").filter(x => Boolean(x));

    
     if(isValidMethod(req.method)){
        const match = matchRoute(req.method, segments, routesL);
    }

    console.log(req.method);
    console.log(url.pathname);
    console.log(url.searchParams);

    res.end("Under construction !");
    
});

server.listen(3000,()=>console.log("The server is Live on port 3000!"));