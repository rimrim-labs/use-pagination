import mongoose from 'mongoose'
import { Post, PostCategory } from '../../types/post.type'

const postSchema = new mongoose.Schema<Post>(
  {
    title: String,
    content: String,
    author: String,
    category: {
      type: Number,
      enum: Object.values(PostCategory),
    },
  },
  {
    timestamps: true,
  }
)

const PostModel = mongoose.model<Post>('Post', postSchema)

export default PostModel
