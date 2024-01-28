import { date, number, object, ObjectSchema, string } from 'yup'
import { DateRequest, DateStrRequest, PagingRequest } from '../types/request.type'
import { isMatch } from 'date-fns'

type PagingQuery = Pick<PagingRequest, 'size' | 'page'>

export const pagingQuerySchema: ObjectSchema<PagingQuery> = object({
  page: number().required().positive().integer(),
  size: number().required().positive().integer(),
})

export const PagingValidationSchema = object({
  query: pagingQuerySchema,
})

export const dateQuerySchema: ObjectSchema<DateRequest> = object({
  date: date()
    .optional()
    .default(() => new Date()),
})

export const dateStrQuerySchema: ObjectSchema<DateStrRequest> = object({
  dateStr: string()
    .typeError((value) => `dateStr 은(는) yyyy-mm-dd 형식의 문자열 값이어야 합니다: ${value}`)
    .default('2023-01-01')
    .test('string format check', 'yyyy-mm-dd 형식의 문자열 값이어야 합니다.', (value, context) => {
      return isMatch(value, 'yyyy-mm-dd')
    }),
})
