import type { NextFunction, Request, Response } from 'express'
import { ISchema, object, ValidationError } from 'yup'
import createError from 'http-errors'

export interface ValidationRequest {
  body?: ISchema<object>
  query?: ISchema<object>
  params?: ISchema<object>
}

const ValidationKey: Array<keyof ValidationRequest> = ['body', 'query', 'params']

const shapeSchema = (request: ValidationRequest) => {
  let schema = object()

  for (const key of ValidationKey) {
    if (request[key]) {
      schema = schema.shape({
        [key]: request[key] as ISchema<object>,
      })
    }
  }

  return schema
}

export const validate =
  (...requests: ValidationRequest[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const request of requests) {
        const schema = shapeSchema(request)
        await schema.validate({
          body: req.body,
          query: req.query,
          params: req.params,
        })
      }

      return next()
    } catch (err) {
      if (err instanceof ValidationError) return next(createError(400, err.message))
      return next(createError(400, 'validation failed'))
    }
  }
