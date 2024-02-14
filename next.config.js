/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'res.cloudinary.com' }
    ]
  },
  env: {
    REACT_APP_CLOUDINARY_CLOUD_NAME: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    REACT_APP_CLOUDINARY_API_KEY: process.env.REACT_APP_CLOUDINARY_API_KEY,
    REACT_APP_CLOUDINARY_API_SECRET: process.env.REACT_APP_CLOUDINARY_API_SECRET,
    REACT_APP_CLOUDINARY_UPLOAD_PRESET: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  }
}

module.exports = nextConfig
