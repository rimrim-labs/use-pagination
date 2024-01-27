import PostModel from '../../src/db/schema/post.schema'
import { connect } from '../../src/db'
import { generate } from 'randomstring'

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
        category: 'it',
      })

      await post.save()
    }
  })
})
