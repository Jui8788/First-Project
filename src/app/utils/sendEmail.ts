/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'sumaiyaalhasan2@gmail.com',
      pass: 'tgpu mcdy vnyr isiv',
    },
  })

  await transporter.sendMail({
    from: 'sumaiyaalhasan2@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: '', // plain text body
    html, // html body
  })
}
