import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import User from '../models/userSchema.js'

export const auth = async (req, res, next) => {
  try {
    
    let token;
    if(req.headers.Authorization){
      token = req.headers.authorization.split(' ')[1]
    }
    const isCustomAuth = token.length < 500
    let decoded
  
    if(!token) return res.status(401).json({message: 'You are not logged in. Please log in to continue'})

    if(token && isCustomAuth){
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET )
      req.userId = decoded.id

    }else{
      decoded = jwt.decode(token)
      req.userId = decoded?.sub
    }
    // const user = await User.findById(decoded.id)  
    // if(!user) return res.status(404).json({message: 'the user does not exist'})
  
    next()
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error
    });
  }
}