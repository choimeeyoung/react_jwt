const jwt = require('jsonwebtoken');

const postRouter = async (req,res) => {
    const user = req.body
    const secret = req.app.get('jwt-secret');
    try{
        const token =  await new Promise((resolve,reject) =>{
            jwt.sign(
                {
                    user_id:user.user_id,
                    authority:user.authority
                },
                secret,
                {
                    expiresIn: '7d',
                    issuer: 'velopert.com',
                    subject: 'userInfo'
                }, (err,token) =>{
                    if(err) reject(err)
                    resolve(token);
                }
            )
        })
        res.status(202).json({
            success: true,
            message:'Token Successfully',
            token : token
        })
    }catch(error){
        console.log(error)
        res.status(403).json({
            success: false,
            message : error.message
        })
    }
}
module.exports = postRouter;
