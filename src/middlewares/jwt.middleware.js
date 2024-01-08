import jwt from "jsonwebtoken";
import blacklistedTokens from "../features/user/user.controller.js";

const jwtAuth = (req, res, next) =>{

    const token = req.headers['authorization'];

    if(!token)
    return res.status(401).send('Unauthorized');

      // Check if the token is blacklisted
  if (blacklistedTokens.has(token)) {
    return res.status(401).send('Token has been invalidated');
  }

    try{
        const payload = jwt.verify(token, 'iCxHbSQC9dSRBKJ8vjMPOSRll6ohpbP0');
        req.userID = payload.userID;
    }
    catch(err){
        return res.status(401).send('Unauthorized');
    }
    next();
}
export default jwtAuth;