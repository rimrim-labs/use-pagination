import { Post } from '../types/post.type'
import PostModel from '../db/schema/post.schema'

import type { Types } from 'mongoose'
import { CursorResponse } from '../types/response.type'
import type { CursorRequest, PagingRequest } from '../types/request.type'

export async function createPost(post: Post) {
  const create = new PostModel({ ...post })
  await create.save()
  return create._id
}

export function findPostsByOffset(paging: PagingRequest): Promise<Post[]> {
  return PostModel.find()
    .limit(paging.size)
    .skip(paging.getSkip())
    .sort({ createdAt: 'desc', title: 'asc' })
    .exec()
}

export async function findPostsByCursor(paging: CursorRequest): Promise<CursorResponse<Post>> {
  const query = paging.cursor ? { _id: { $lte: paging.cursor } } : {}

  const posts = await PostModel.find(query)
    .limit(+paging.size + 1)
    .sort({ createdAt: 'desc', title: 'asc' })
    .exec()

  if (posts.length < +paging.size + 1) {
    return {
      data: posts,
    }
  }

  return {
    next: posts[posts.length - 1]._id.toString(),
    data: posts.slice(0, posts.length - 1),
  }
}

export function findPost(_id: Types.ObjectId): Promise<Post | null> {
  return PostModel.findById(_id)
}

export async function deletePost(_id: Types.ObjectId) {
  return PostModel.deleteOne({ _id })
}
