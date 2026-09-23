import * as http from "node:http"


type RouteType ={ 
    method : string;
    path : string;
    handler: (req: http.IncomingMessage, res: http.ServerResponse, params: Record<string, string>) => void;
}
type MatchRouteReturn = {
    route : RouteType;
    params : Record<string,string>
}


export type {RouteType,MatchRouteReturn};
