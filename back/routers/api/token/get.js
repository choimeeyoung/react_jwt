const jwt = require('jsonwebtoken');

const getRouter = async (req,res) => {

    const token = req.headers['x-access-token'] || req.query.token
    if(!token){
        return res.status(403).json({
            success:false,
            message:'Not Logged In'
        })
    }

    try{
        const decodedToken = await new Promise(
            (resolve,reject) => {
                jwt.verify(token,req.app.get('jwt-secret'),(err,decoded) =>{
                    if(err) reject(err)
                    resolve(decoded)
                })
            }
        )
        res.status(202).json({
            success:true,
            info : decodedToken
        })
    }catch(error){
        console.log(error)
        res.status(403).json({
            message : error.message
        })
    }
}


module.exports = getRouter;
