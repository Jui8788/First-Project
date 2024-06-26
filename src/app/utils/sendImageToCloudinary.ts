import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import multer from 'multer'
import config from '../config'

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
})

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    })
    // Delete the file asynchronously after upload
    fs.unlink(path, (err) => {
      if (err) {
        console.error('Error deleting uploaded file:', err)
      } else {
        console.log('File deleted successfully.')
      }
    })
    console.log(result)
    return result
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error)
    throw error // Re-throw the error to handle it in the calling function
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + '/uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

export const upload = multer({ storage: storage })
