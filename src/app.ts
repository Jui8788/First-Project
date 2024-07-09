import express, { Request, Response, Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import NotFound from './app/middleware/notFound'
import router from './app/routes'
import cookieParser from 'cookie-parser'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))

// application routes
app.use('/api/v1', router)

const test = (req: Request, res: Response) => {
  // Promise.reject()
  const a = 10
  res.send(a)
}

app.get('/', test)

// globalErrorHandler
app.use(globalErrorHandler)

// Not Found Route
app.use(NotFound)

export default app
