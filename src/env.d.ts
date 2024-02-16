declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_CLOUDINARY_CLOUD_NAME: string
    REACT_APP_CLOUDINARY_API_KEY: string
    REACT_APP_CLOUDINARY_API_SECRET: string
    REACT_APP_CLOUDINARY_UPLOAD_PRESET: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SERECT: string
    NEXTAUTH_SECRET: string
    NEXT_SERVER_API_SERVICE: string
  }
}
