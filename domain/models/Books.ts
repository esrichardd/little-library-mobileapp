export type CatalogBook = {
  id: number
  title: string
  author: string
  pages: number
  description: string
  averageReadingTimeMs: number
}

export type DetailedBook = {
  id: number
  title: string
  author: string
  pages: string[]
}
