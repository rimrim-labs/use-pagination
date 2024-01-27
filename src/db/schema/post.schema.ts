import mongoose from 'mongoose'
import { Post } from '../../types/post.type'

const postSchema = new mongoose.Schema<Post>(
  {
    title: String,
    content: String,
    author: String,
    category: {
      type: String,
      enum: ['it', 'food', 'workout'],
    },
  },
  {
    timestamps: true,
  }
)

const PostModel = mongoose.model<Post>('Post', postSchema)

export default PostModel
