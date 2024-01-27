import PostModel from '../../src/db/schema/post.schema'
import { connect } from '../../src/db'
import { generate } from 'randomstring'
import { PostCategory } from '../../src/types/post.type'

function generateRandomCategory() {
  const idx = Math.random() * Object.keys(PostCategory).length
  return PostCategory[idx]
}

beforeEach(async () => {
  await connect()
})

describe('목 데이터 생성', () => {
  it('Post 도큐먼트를 생성한다.', async () => {
    for (let i = 0; i < 10_000; i++) {
      const post = new PostModel({
        author: generate({ length: 7 }),
        content: generate({ length: 30 }),
        title: generate({ length: 10 }),
        category: generateRandomCategory(),
      })

      await post.save()
    }
  })
})
