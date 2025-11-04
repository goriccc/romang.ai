import Link from "next/link"
import Image from "next/image"
import { Character } from "@/lib/types"
import { Card } from "./ui/Card"
import { cn } from "@/lib/utils"

interface CharacterCardProps {
  character: Character
  showPopularity?: boolean
}

export default function CharacterCard({ character, showPopularity = true }: CharacterCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}만`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}천`
    }
    return num.toString()
  }

  // 박혜림(id: "3")인 경우 채팅 페이지로 이동
  const href = character.id === "3" ? `/chat/${character.id}` : `/characters/${character.id}`

  return (
    <Link href={href}>
      <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]">
        <div className="aspect-[3/4] relative bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20">
          {character.image ? (
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl text-gray-400">{character.name[0]}</span>
            </div>
          )}
          {character.isNew && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              신작
            </span>
          )}
          {showPopularity && (
            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
              {formatNumber(character.popularity)}
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm mb-1 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {character.name}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {character.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {character.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
              >
                #{tag}
              </span>
            ))}
            {character.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{character.tags.length - 3}</span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
