import { Router } from 'express'
import { PagingRequest } from '../types/request.type'
import { createPost, findPostsByOffset } from '../service/post.service'

import type { Request, Response } from 'express'
import type { Post } from '../types/post.type'

const PostRouter = Router()

PostRouter.post('/', async (req: Request<object, object, Post>, res: Response, next) => {
  try {
    const post = req.body
    console.log(post)
    const postId = await createPost(post)
    return res.json(postId.toJSON())
  } catch (err) {
    next(err)
  }
})

PostRouter.get(
  '/offset',
  async (
    req: Request<
      object,
      object,
      object,
      {
        page: number
        size: number
      }
    >,
    res: Response<Post[]>,
    next
  ) => {
    try {
      const { page, size } = req.query
      const posts = await findPostsByOffset(new PagingRequest(page, size))
      return res.json(posts)
    } catch (err) {
      next(err)
    }
  }
)

export default PostRouter
