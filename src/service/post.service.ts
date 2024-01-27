import { Post } from '../types/post.type'
import PostModel from '../db/schema/post.schema'
import type { Types } from 'mongoose'
import { PagingRequest } from '../types/request.type'

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

export function findPost(_id: Types.ObjectId): Promise<Post | null> {
  return PostModel.findById(_id)
}

export async function deletePost(_id: Types.ObjectId) {
  return PostModel.deleteOne({ _id })
}
