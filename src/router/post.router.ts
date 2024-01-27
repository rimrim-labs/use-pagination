import { Router } from 'express'
import { PagingRequest } from '../types/request.type'
import { findPostsByOffset } from '../service/post.service'

import type { Request, Response } from 'express'
import { Post } from '../types/post.type'

const PostRouter = Router()

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
