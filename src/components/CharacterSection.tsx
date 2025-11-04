import { Character } from "@/lib/types"
import CharacterCard from "./CharacterCard"

interface CharacterSectionProps {
  title: string
  characters: Character[]
  showPopularity?: boolean
  viewAllHref?: string
}

export default function CharacterSection({
  title,
  characters,
  showPopularity = true,
  viewAllHref,
}: CharacterSectionProps) {
  if (characters.length === 0) return null

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {viewAllHref && (
            <a
              href={viewAllHref}
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              더보기 →
            </a>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              showPopularity={showPopularity}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
