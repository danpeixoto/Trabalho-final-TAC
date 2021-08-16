const config = require("config")
const jwt = require("jsonwebtoken");


module.exports = (req,res,next)=>{
  const token = req.header("x-auth-token");

  if(!token){
    return res.status(401).json({
      msg:"No token, authorization denied"
    });
  }

  try {
    const decoded = jwt.verify(toke,config.get("jwtSecret"));

    if(decoded.user.is_admin !== config.get("adminSecret")){
      return res.status(401).json({
        msg:"Get out of here, pitful hacker."
      });
    }

    req.user = decoded.user;

    next();

  } catch (err) {
    res.status(401).json({
      msg:"Token is not valid"
    });
  }
}