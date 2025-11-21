// import jwt from 'jsonwebtoken'

// import { User } from '../models/user.model'

// const authenticateToken = (req, res, next) =>{
//     try {
//         const token = req.cookies.token
//         if(!token){
//             return res.status(401).json({
//                 message:"No token provided",
//                 success:false
//         })
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         // set user type based on token contents
//         if(decoded.scribeId){
//             req.userType = 'scribe'
//             req.scribeId = decoded.scribeId
//         }
//         else if (decoded.candidateId) {
//             req.userType = 'candidate';
//             req.candidateId = decoded.candidateId;
//         }
//         else if (decoded.ngoId) {
//             req.userType = 'ngo';
//             req.ngoId = decoded.ngoId;
//         }
//         else {
//             return res.status(401).json({ 
//             message: "Invalid token",
//             success:false });
//         }
//         // if(!decoded){
//         //     return res.status(401).json({
//         //         message:"Invalid token",
//         //         success:false
//         //     })
//         // }
//         // req.id = decoded.userId
//         next()
//     } catch (error) {
//         return res.status(401).json({
//         message:"Invalid token", 
//         success:false})
//     }
// }

// export default authenticateToken



import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'; // Import User model

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        success: false
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user in database to verify existence and get role
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false
      });
    }

    // Set user information based on database record
    req.userId = decoded.userId;
    req.userRole = user.role;
    req.user = user; // Attach full user object if needed
    req.roleId = decoded.roleId; // Add role-specific ID

    // Set role-specific IDs if needed
    if (user.role === 'scribe') {
      req.scribeId = decoded.roleId; // Keep if you have separate scribe IDs
    } else if (user.role === 'candidate') {
      req.candidateId = decoded.roleId; // Keep if you have separate candidate IDs
    } else if (user.role === 'ngo') {
      req.ngoId = decoded.roleId; // Keep if you have separate NGO IDs
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      message: "Invalid token",
      success: false
    });
  }
}

export default authenticateToken; 

