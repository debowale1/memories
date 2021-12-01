import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userSchema.js'

export const signin = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.findOne({email})
    if(!user) return res.status(404).json({message: 'User does not exist!'})

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Login Credentials'})

    //create token
    const token = await jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN)

    res.status(200).json({ result: user, token})
  } catch (error) {
    res.status(500).json({message: 'Something went wrong'})
  }
}
export const signup = async (req, res) => {
  const {firstName, lastName, email, password, confirmPassword } = req.body
  if(!firstName || !lastName || !email || !password || !confirmPassword){
    return res.status(400).json({message: 'Please provide every field'})
  }
  try {
    // check if email already exists
    const user = await User.findOne({email})
    if(user) return res.status(400).json({ message: 'User already exist. Please login instead' })

    if(password !== confirmPassword) return res.status(400).json({ message: 'Passwords dont match' })

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword
    })

    //create token
    const token = await jwt.sign({id: result._id, email: result.email}, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN)

    res.status(201).json({result, token})
    
  } catch (error) {
    res.status(500).json({message: 'Something went wrong'})
  }


}