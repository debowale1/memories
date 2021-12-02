import {AUTH} from '../constants/actionTypes'
import * as api from '../api'

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //log in the user ...
    const {data} = api.signIn(formData)

    dispatch({ type: AUTH, data })
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //log in the user ...
    const {data} = api.signUp(formData)

    dispatch({ type: AUTH, data })
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}