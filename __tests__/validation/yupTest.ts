import {
  dateQuerySchema,
  dateStrQuerySchema,
  pagingQuerySchema,
} from '../../src/validation/post.validation'

describe('yup 타입 캐스팅 테스트', () => {
  it('인풋 값을 스키마 타입으로 캐스팅에 실패한다.', () => {
    expect(() =>
      pagingQuerySchema.cast({
        page: 12,
      })
    ).toThrow(/The value of size could not be cast to a value that satisfies the schema type/)
  })

  it('유효하지 않은 인풋 값도 date 타입으로 캐스킹한다.', () => {
    /* number: epoch 시간으로부터 경과된 ms */
    const epochParsed = dateQuerySchema.cast({
      date: 12,
    })

    /* 2023-01 */
    const dateStrParsed = dateQuerySchema.cast({
      date: '2022-13-12',
    })

    expect(epochParsed.date).toBeInstanceOf(Date)
    expect(dateStrParsed.date).toBeInstanceOf(Date)
    expect(dateStrParsed.date.getFullYear()).toEqual(2023)
    expect(dateStrParsed.date.getMonth()).toEqual(0)
  })

  it('인풋 값을 스키마 타입으로 캐스팅한다.', () => {
    const parsed = pagingQuerySchema.cast({
      page: '12',
      size: -1,
    })

    expect(parsed.page).toEqual(12)
    expect(parsed.size).toEqual(-1)
  })
})

describe('yup 검증 테스트', () => {
  it('인풋 값을 검증한다.', async () => {
    const parsed = pagingQuerySchema.cast({
      page: '12',
      size: -1,
    })

    await expect(() => pagingQuerySchema.validate(parsed)).rejects.toThrow(
      /size must be a positive number/
    )
  })
})

describe('yup yyyy-mm-dd 형식 문자열 유효성 검증 테스트', () => {
  it('인풋 값이 undefined 이면, default 값을 설정한다.', () => {
    const parsed = dateStrQuerySchema.cast({
      dateStr: undefined,
    })

    expect(parsed.dateStr).toEqual('2023-01-01')
  })

  it('인풋 값이 문자열로 캐스팅 불가능하면 타입 에러를 던진다.', () => {
    const data = {
      dateStr: null,
    }

    expect(() => dateStrQuerySchema.cast(data)).toThrow(TypeError)
  })

  it('인풋 값이 유효한 형태의 문자열이 아니면 에러를 던진다.', () => {
    const parsed = dateStrQuerySchema.cast({ dateStr: NaN })

    expect(() => dateStrQuerySchema.validateSync(parsed)).toThrow(
      'yyyy-mm-dd 형식의 문자열 값이어야 합니다.'
    )
  })
})
