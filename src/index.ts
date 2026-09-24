import * as http from 'http';
import type { RouteType, MatchRouteReturn } from './types.ts';



// temporary
function firstHandler(req: http.IncomingMessage, res: http.ServerResponse, params: Record<string, string>) {
    console.log(params);
    res.end(`User handler`);
}

// Our route table
const routesL: RouteType[] = [
    { method: "GET", path: "/users/:id", handler: firstHandler },
    { method: "GET", path: "/users", handler: (req, res, params) => res.end("Users") },
    { method: "POST", path: "/user", handler: (req, res, params) => res.end("POST user") }
]



function matchRoute(method: string, segment: string[], routes: RouteType[]): MatchRouteReturn | null {

    // loop over routes 
    for (const route of routes) {
        if (method !== route.method) continue;
        let matched = true;
        const params: Record<string, string> = {};
        // segment each route's path 
        const localRoute = route.path.split("/").slice(1);
        // check if routes has same length (if so , they have a big chance to be valid)
        if (localRoute.length === segment.length) {


            for (let i = 0; i < segment.length; i++) {
                // we used ! because we already checked the length equality at outer scope
                const patternPiece = localRoute[i]!;
                const actualPiece = segment[i]!;

                // check if it is a param or static
                // param check
                if (patternPiece.startsWith(":")) {
                    // store as a dictionary (ex: id : 42)
                    params[patternPiece.slice(1)] = actualPiece;

                }//static check
                else {
                    // see if segement elements has same content
                    if (patternPiece !== actualPiece) {
                        matched = false;
                        break;
                    }

                }

            }
            if (matched) { return { route, params }; }
        }

    }



    return null;

}

function readJsonBody(req : http.IncomingMessage,cb : (error : null ,body? : unknown )=> void){

}

const server = http.createServer((req, res) => {
    try {
        // we safely check if not undefined for Node TS
        if (!req.url) {
            res.statusCode = 400;
            res.end("bad request");
            return;
        }
        let url: URL;

        
        url = new URL(req.url, "http://localhost");
        // IMPLEMENTING BODY RECEIVING MECHANISM 


        const segments = url.pathname.split("/").filter(x => Boolean(x));


        if (typeof req.method === 'string') {
            const match = matchRoute(req.method, segments, routesL);
            if (match === null) {
                res.statusCode = 404;
                res.end("Not Found");
                return;
            }
            else {
                match.route.handler(req, res, match.params);
            }

        }




    }
    catch (err) {
        console.error("Request failed", {
            method: req.method,
            url: req.url,
            error: err
        });


        if (!res.writableEnded) {
            res.statusCode = 500;
            res.end("Internal Server Error");
        }
    }


});

server.listen(3000, () => console.log("The server is Live on port 3000!"));