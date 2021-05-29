const deleteRouter = async (req,res) => {
    try{
        // req.session.destroy(()=>{
        //     res.clearCookie('connect.sid');
        //     res.status(202).json({
        //         success: true,
        //         message:'Token Delete Successfully',
        //     })
        // });
        req.session.destroy();

        res.status(202).json({
            success: true,
            message: 'Token Delete Successfully',
        })

    }catch(error){
        console.log(error)
        res.status(403).json({
            success: false,
            message : error.message
        })
    }
}
module.exports = deleteRouter;
