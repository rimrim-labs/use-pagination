import type { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'yup'

export interface ValidationSchema {
  body?: ObjectSchema<object>
  query?: ObjectSchema<object>
  params?: ObjectSchema<object>
}

export const validate =
  (schema: ObjectSchema<ValidationSchema>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (err) {
      next(err)
    }
  }
