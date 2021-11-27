import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, 
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
}
)

const Post = mongoose.model('Post', postSchema)
export default Post