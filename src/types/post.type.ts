export type PostCategory = 'it' | 'food' | 'workout'

export interface Post {
  author: string
  content: string
  title: string
  category: PostCategory
}
