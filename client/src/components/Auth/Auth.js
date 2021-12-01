import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import {GoogleLogin} from 'react-google-login';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import useStyles from './styles' 
import Input from './Input'
import Icon from './Icon'
import {signin, signup} from '../../actions/auth'
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}
const Auth = () => {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignup){
      dispatch(signup(formData, navigate))
    }else{
      dispatch(signin(formData, navigate))
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignup((prevSignupState) => !prevSignupState)
    handleShowPassword(false)

  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId
    
    try {
      dispatch({ type: 'AUTH', data: {result, token}})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = (error) => {
    console.log(error)
    console.log('Something went wrong. Try again later')    
  }


  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up': 'Sign In'}</Typography>
        <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>

                <Input 
                  name="firstName" 
                  label="First Name" 
                  autoFocus
                  half
                  // value={}
                  handleChange={handleChange} 
                />
                <Input 
                  name="lastName" 
                  label="Last Name" 
                  half
                  // value={}
                  handleChange={handleChange} 
                />
                </>
              )
            }
            <Input name='email' lable='Email Address' handleChange={handleChange} type='email' />
            <Input name='password' lable='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
            {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} />}
          </Grid>
          <Button className={classes.submit} variant="contained" color="primary" type="submit" fullWidth>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
          <GoogleLogin
            clientId="180923766510-o2n4fl9eq1geh53ccqa3oknban71qbp0.apps.googleusercontent.com"
            render={renderProps => (
              <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained' >Google Sign In</Button>
            )}
            buttonText="Login"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In': 'Dont have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        
        
        {/* <Button variant="contained" size="small" color="secondary" type="submit" fullWidth onClick=''>Clear</Button> */}
        
      </form>
      </Paper>
    </Container>
  )
}

export default Auth
