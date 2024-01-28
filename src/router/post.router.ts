import { Router } from 'express'
import { CursorRequest, PagingRequest } from '../types/request.type'
import { createPost, findPostsByCursor, findPostsByOffset } from '../service/post.service'

import type { CursorResponse } from '../types/response.type'
import type { Request, Response } from 'express'
import type { Post } from '../types/post.type'
import { validate } from '../validation'
import { PagingValidationSchema } from '../validation/post.validation'

const PostRouter = Router()

PostRouter.post('/', async (req: Request<object, object, Post>, res: Response, next) => {
  try {
    const post = req.body
    const postId = await createPost(post)
    return res.json(postId.toJSON())
  } catch (err) {
    next(err)
  }
})

PostRouter.get('/validate', validate(PagingValidationSchema), async (req, res: Response, next) => {
  try {
    return res.json('validate success')
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

PostRouter.get(
  '/cursor',
  async (
    req: Request<
      object,
      object,
      object,
      {
        cursor?: string
        size: number
      }
    >,
    res: Response<CursorResponse<Post>>,
    next
  ) => {
    try {
      const { cursor, size } = req.query
      const posts = await findPostsByCursor(new CursorRequest(size, cursor))
      return res.json(posts)
    } catch (err) {
      next(err)
    }
  }
)

export default PostRouter
