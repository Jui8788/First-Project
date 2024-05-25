import { Request, Response, NextFunction } from 'express'

const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  return res.status(500).json({
    success: false,
    message: error.message || 'Something went wrong',
    error: error,
  })
}

export default globalErrorHandler
