import React from 'react'
import {useDispatch} from 'react-redux'
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@material-ui/core'
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThumbUpAltIcon  from '@mui/icons-material/ThumbUpAlt'
import DeleteIcon  from '@mui/icons-material/Delete'
import MoreHorizIcon  from '@mui/icons-material/MoreHoriz'
import moment from 'moment'
import useStyles from './styles'
import { deletePost, likePost } from '../../../actions/posts'

const Post = ({post, setCurrentId}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  return (
    <Card className={classes.card} >
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6"  >{post.name}</Typography>
        <Typography variant="body2"  >{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2} >
        <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)} >
          <MoreHorizIcon fontSize="default"/>
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color='textSecondary'>{post.tags.map(tag => {
          return `#${tag} `
        })}</Typography>

      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color='textSecondary' component='p'>{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions} >
        <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))} >
          <ThumbUpAltIcon fontSize='small' />
          Like { }
          {post.likeCount}
        </Button>
        <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))} >
          <DeleteIcon fontSize='small' />
          Delete { }
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post
