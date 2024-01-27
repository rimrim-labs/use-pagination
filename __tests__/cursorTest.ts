import { connect } from '../src/db'
import request from 'supertest'
import app from '../src/app'

beforeEach(() => connect())

describe('커서 기반 페이지네이션 테스트', () => {
  it('커서 기반으로 데이터를 조회한다.', async () => {
    /* given */
    const cursor = '65b4fe7de3e5435234a68f61'
    const size = 10

    /* when */
    const res = await request(app)
      .get(`/posts/cursor?cursor=${cursor}&size=${size}`)
      .expect('Content-Type', /json/)
      .expect(200)

    /* then */
    expect(res.body.data.length).toEqual(size)
    expect(res.body.data[0]._id).toEqual(cursor)
    expect(res.body.next).not.toBeUndefined()
  })
})
