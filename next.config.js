/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'res.cloudinary.com' },
      { hostname: 'lh3.googleusercontent.com' }
    ]
  },
  env: {
    REACT_APP_CLOUDINARY_CLOUD_NAME: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    REACT_APP_CLOUDINARY_API_KEY: process.env.REACT_APP_CLOUDINARY_API_KEY,
    REACT_APP_CLOUDINARY_API_SECRET: process.env.REACT_APP_CLOUDINARY_API_SECRET,
    REACT_APP_CLOUDINARY_UPLOAD_PRESET: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SERECT: process.env.GOOGLE_CLIENT_SERECT,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_SERVER_API_SERVICE: process.env.NEXT_SERVER_API_SERVICE
  }
}

module.exports = nextConfig
