export type Admin = {
  adminId: number
  adminName: string
}

export type User = {
  userId: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  avatar: string
  roles: UserRole[]
  isActive: boolean
}

export type UserRole =
  | 'ADMIN'
  | 'USER'
  | 'STORE_OWNER'
  | 'STORE_MEMBER'
  | 'SHIPPER'

export type Report = {
  postReportId: number
  post: Post
  reporterName: string
  status: string
  reportedAt: Date
  decisionAt: Date
}

export type Post = {
  postId: number
  postAuthorId: number
  postContent: string
  postAuthorName: string
  postAuthorAvatar: string
  postImages: string[]
  postTags: string[]
  createdAt: Date
  totalReaction: number
  totalComment: number
  reacted: boolean
  yourPost: boolean
  saved: boolean
  reported: boolean
}
