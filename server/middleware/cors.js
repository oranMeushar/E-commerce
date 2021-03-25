const cors = () =>{
    return (req, res, next) =>{
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        if (req.headers.origin === 'http://localhost:3000') {
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTION, HEAD');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        }
        else{
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, POST');
        }
        next();
    }
}
module.exports = cors;