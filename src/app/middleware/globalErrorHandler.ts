import { Request, Response, NextFunction } from 'express'

const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  const statusCode = error.statusCode || 500

  return res.status(statusCode).json({
    success: false,
    message: error.message || 'Something went wrong',
    error: error,
  })
}

export default globalErrorHandler
