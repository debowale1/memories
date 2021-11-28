import mongoose from 'mongoose'
import Post from '../models/postSchema.js'

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json({ message: error.message})
  }
}
export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new Post(post)
try {
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
}

export const updatePost = async (req, res) => {
  const {id: _id } = req.params
  const post = req.body
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send('No post with that id')

  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, {...post, _id }, { new: true, runValidators: true })
    res.status(200).json(updatedPost)
  } catch (error) {
    
  }

}

export const deletePost = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send('No post with that id')
  try {
    await Post.findByIdAndRemove(id)
    res.status(203).json({ message: 'Post Deleted Successfully!'})
  } catch (error) {
    console.log(error)
  }
}
export const likePost = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send('No post with that id')
  try {
    const post = await Post.findById(id)
    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true } )
    res.status(200).json(updatedPost)
  } catch (error) {
    console.log(error)
  }
}


