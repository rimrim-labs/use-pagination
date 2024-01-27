export interface CursorResponse<T> {
  next?: string
  data: T[]
}
