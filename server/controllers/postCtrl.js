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
