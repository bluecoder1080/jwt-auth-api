export function methodsMiddlewares(req, res, next){
    console.log(`${req.method} Request Came`);
  next();
}