import helmetApp from "./helmet.js";
import cookieMiddleware from "./cookies.js";
import corsMiddleware from "./cors.js";

const middleWares = (app)=> {
    helmetApp(app);
    cookieMiddleware(app);
    corsMiddleware(app);
}

export default middleWares