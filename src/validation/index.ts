import type { Request, Response, NextFunction } from 'express'
import { ObjectSchema, ValidationError } from 'yup'
import createError from 'http-errors'

export const validate =
  (schema: ObjectSchema<object>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (err) {
      if (err instanceof ValidationError) return next(createError(400, err.message))
      return next(createError(400, 'validation failed'))
    }
  }
