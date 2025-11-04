import Header from "@/components/Header"
import { mockCharacters } from "@/lib/mock-data"
import CharacterCard from "@/components/CharacterCard"

interface CharactersPageProps {
  searchParams: {
    sort?: string
    category?: string
    gender?: string
    tag?: string
  }
}

export default function CharactersPage({ searchParams }: CharactersPageProps) {
  let filteredCharacters = [...mockCharacters]

  // 필터링
  if (searchParams.category) {
    filteredCharacters = filteredCharacters.filter(
      (char) => char.category === searchParams.category
    )
  }

  if (searchParams.gender) {
    filteredCharacters = filteredCharacters.filter(
      (char) => char.gender === searchParams.gender
    )
  }

  if (searchParams.tag) {
    filteredCharacters = filteredCharacters.filter((char) =>
      char.tags.some((tag) => tag.includes(searchParams.tag!))
    )
  }

  // 정렬
  if (searchParams.sort === "popularity") {
    filteredCharacters.sort((a, b) => b.popularity - a.popularity)
  } else if (searchParams.sort === "newest") {
    filteredCharacters.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )
  } else if (searchParams.sort === "name") {
    filteredCharacters.sort((a, b) => a.name.localeCompare(b.name))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            캐릭터 목록
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredCharacters.length}개의 캐릭터를 찾았습니다
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          <a
            href="/characters"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              !searchParams.sort
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            전체
          </a>
          <a
            href="/characters?sort=popularity"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              searchParams.sort === "popularity"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            인기순
          </a>
          <a
            href="/characters?sort=newest"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              searchParams.sort === "newest"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            최신순
          </a>
          <a
            href="/characters?sort=name"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              searchParams.sort === "name"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            이름순
          </a>
        </div>

        {filteredCharacters.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                showPopularity={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">
              캐릭터를 찾을 수 없습니다.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
