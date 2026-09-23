import * as http from "node:http"

type MethodType = "PATCH" | "GET" | "POST" | "DELETE" | "PUT";
type RouteType ={ 
    method : MethodType;
    path : string;
    handler: (req: http.IncomingMessage, res: http.ServerResponse, params: Record<string, string>) => void;
}
type MatchRouteReturn = {
    route : RouteType;
    params : Record<string,string>
}


export type {MethodType,RouteType,MatchRouteReturn};
