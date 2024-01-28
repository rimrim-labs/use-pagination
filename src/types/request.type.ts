export class PagingRequest {
  constructor(
    public readonly page: number,
    public readonly size: number
  ) {}

  getSkip(): number {
    return (this.page - 1) * this.size
  }
}

export class CursorRequest {
  constructor(
    public readonly size: number,
    public readonly cursor?: string
  ) {}
}

export type DateRequest = {
  date: Date
}

export type DateStrRequest = {
  dateStr: string
}
