import express from 'express'
import createError from 'http-errors'

import PostRouter from './router/post.router'

import type { Request, Response, NextFunction } from 'express'
import type { HttpError } from 'http-errors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/posts', PostRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json(err.message)
})

export default app
