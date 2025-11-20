import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) =>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message:"No token provided",
                success:false
        })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // set user type based on token contents
        if(decoded.scribeId){
            req.userType = 'scribe'
            req.scribeId = decoded.scribeId
        }
        else if (decoded.candidateId) {
            req.userType = 'candidate';
            req.candidateId = decoded.candidateId;
        }
        else if (decoded.ngoId) {
            req.userType = 'ngo';
            req.ngoId = decoded.ngoId;
        }
        else {
            return res.status(401).json({ 
            message: "Invalid token",
            success:false });
        }
        // if(!decoded){
        //     return res.status(401).json({
        //         message:"Invalid token",
        //         success:false
        //     })
        // }
        // req.id = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({
        message:"Invalid token", 
        success:false})
    }
}

export default authenticateToken