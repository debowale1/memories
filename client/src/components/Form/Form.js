import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import useStyles from './styles'
import {createPost, updatePost} from '../../actions/posts'

const Form = ({currentId, setCurrentId}) => {
  const post = useSelector((state) => currentId ? state.posts.find(p => p._id === currentId): null)
  const classes = useStyles()

  const [postData, setPostData] = useState({
    title: '', creator: '', message: '', tags: '', selectedFile: ''
  })  
  const dispatch = useDispatch()

  useEffect(() => {
    if(post) setPostData(post)
  }, [post])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!currentId){
      dispatch(createPost(postData))
    }else{
      dispatch(updatePost(currentId, postData))
    }
    clear()
  }
  const clear = () => {
    setCurrentId(null)
    setPostData({
      title: '', creator: '', message: '', tags: '', selectedFile: ''
    })
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField 
          name="creator" 
          label="Creator" 
          variant="outlined"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value})} 
        />
        <TextField 
          name="title" 
          label="Title" 
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value})} 
        />
        <TextField 
          name="message" 
          label="Message" 
          variant="outlined"
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value})} 
        />
        <TextField 
          name="tags" 
          label="Tags" 
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})} 
        />
        <div className={classes.fileInput}>
          <FileBase
          type="file"
          multiple={false}
          onDone={({base64}) => setPostData({ ...postData, selectedFile: base64}) } />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" size="large" color="primary" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" size="small" color="secondary" type="submit" fullWidth onClick={clear}>Clear</Button>
        
      </form>
    </Paper>
  )
}

export default Form