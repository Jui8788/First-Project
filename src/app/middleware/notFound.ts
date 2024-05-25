import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'

const NotFound = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    error: '',
  })
}

export default NotFound
