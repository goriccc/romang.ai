export interface Character {
  id: string
  name: string
  description: string
  tags: string[]
  category: string
  gender?: "남성" | "여성" | "기타"
  popularity: number
  viewCount?: number
  image?: string
  thumbnail?: string
  createdAt: Date
  updatedAt?: Date
  author?: string
  isNew?: boolean
  isFeatured?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  color?: string
}

export type CharacterSortType = "popularity" | "newest" | "name"

export interface CharacterFilter {
  category?: string
  tags?: string[]
  gender?: "남성" | "여성" | "기타"
  sortBy?: CharacterSortType
}
