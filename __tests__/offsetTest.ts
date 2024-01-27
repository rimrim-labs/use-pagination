import request from 'supertest'
import app from '../src/app'
import { connect } from '../src/db'
import { Post } from '../src/types/post.type'

beforeEach(() => connect())

describe('오프셋 기반 페이지네이션 테스트', () => {
  it('페이지 기반으로 데이터를 조회한다.', async () => {
    /* given */
    const page = 10
    const size = 10

    /* when */
    const res = await request(app)
      .get(`/posts/offset?page=${page}&size=${size}`)
      .expect('Content-Type', /json/)
      .expect(200)

    /* then */
    expect(res.body.length).toEqual(size)
  })

  it('도중에 데이터가 생성되면 중복된 데이터를 반환 받는다.', async () => {
    /* given */
    const page = 10
    const size = 10
    const newPost: Post = {
      author: 'admin',
      content: 'hello, this is test post',
      title: 'this is test post',
      category: 'it',
    }

    const page10 = await request(app)
      .get(`/posts/offset?page=${page}&size=${size}`)
      .expect('Content-Type', /json/)
      .expect(200)

    /* when */
    await request(app)
      .post('/posts')
      .send(newPost)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    /* then */
    const page11 = await request(app)
      .get(`/posts/offset?page=${page + 1}&size=${size}`)
      .expect('Content-Type', /json/)
      .expect(200)

    const page10lastContent = page10.body[page10.body.length - 1]
    const page11firstContent = page11.body[0]

    expect(page10lastContent).toEqual(page11firstContent)
  })
})
