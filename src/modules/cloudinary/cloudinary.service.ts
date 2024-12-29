import { Injectable } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryResponse } from './interfaces/cloudinary-response.interface'
import { CloudinaryConfig } from 'src/config/claudinary.config'

cloudinary.config(CloudinaryConfig)

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'animals',
        },
        (error, result) => {
          if (error) return reject(error)
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          })
        },
      )

      uploadStream.end(file.buffer)
    })
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId)
  }
}
