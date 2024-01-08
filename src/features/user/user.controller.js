
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserRepository from "./user.repository.js";
// Assuming you have a list to store invalidated tokens
const blacklistedTokens = new Set();
export class UserController{

  constructor(){
      this.userRepository = new UserRepository();
  }

  async resetPassword(req, res){
    try{
      const{newPassword}= req.body;
      const hashedPassword = await bcrypt.hash(newPassword,12);
      const userID = req.userID;
      await this.userRepository.resetPassword(userID, hashedPassword);
      res.status(200).send("Password is updated");
    }catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

   async signUp(req, res,next){
    try{
        const {name, emailID,password} = req.body;
     
        const hashedPassword = await bcrypt.hash(password, 12);
      
       const user = await this.userRepository.signUp(name, emailID, hashedPassword);
            return res.status(201).send(user);
    }catch(err){
      next(err);
    }
    }

     async signIn(req, res) {
      try{
      // 1. Find user by email.
      const user = await this.userRepository.findByEmail(req.body.emailID);
      if(!user){
        return res
        .status(400)
        .send('Incorrect Credentials');
      } else {
        // 2. Compare password password with hashed password.
        const result = await bcrypt.compare(req.body.password, user.password);
        if(result){

          // 3. Create token.
          const token = jwt.sign(
            {
              userID: user._id,
              emailID: user.emailID,
            },
            'iCxHbSQC9dSRBKJ8vjMPOSRll6ohpbP0',
            {
              expiresIn: '6h',
            }
          );  
      // 4. Send token.
      return res.status(200).send(token);
        } else {
          return res
        .status(400)
        .send('Incorrect Credentials');
        }
      }
  } catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }


async signout(req, res) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  // Add the token to the blacklist
  blacklistedTokens.add(token);

  return res.status(200).send('Logged out successfully');
}
}
export default blacklistedTokens;