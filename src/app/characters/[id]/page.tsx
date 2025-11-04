import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header"
import { mockCharacters } from "@/lib/mock-data"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { MessageCircle, Heart, Share2, BookOpen } from "lucide-react"

interface CharacterDetailPageProps {
  params: {
    id: string
  }
}

export default function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  const character = mockCharacters.find((char) => char.id === params.id)

  if (!character) {
    notFound()
  }

  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}만`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}천`
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 좌측: 캐릭터 이미지 및 기본 정보 */}
          <div className="md:col-span-1">
            <Card className="overflow-hidden">
              <div className="aspect-[3/4] relative bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20">
                {character.image ? (
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl text-gray-400">{character.name[0]}</span>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-2">{character.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {character.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>조회수 {formatNumber(character.viewCount || character.popularity)}</span>
                  {character.gender && <span>{character.gender}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <Link href={`/chat/${character.id}`}>
                    <Button className="w-full" size="lg">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      채팅 시작하기
                    </Button>
                  </Link>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      좋아요
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      공유
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 우측: 상세 정보 */}
          <div className="md:col-span-2 space-y-6">
            {/* 카테고리 및 태그 */}
            <Card>
              <CardHeader>
                <CardTitle>정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2">카테고리</h3>
                  <Link
                    href={`/characters?category=${character.category}`}
                    className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-md text-sm hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
                  >
                    {character.category}
                  </Link>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2">태그</h3>
                  <div className="flex flex-wrap gap-2">
                    {character.tags.map((tag, idx) => (
                      <Link
                        key={idx}
                        href={`/characters?tag=${tag}`}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
                {character.gender && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">성별</h3>
                    <Link
                      href={`/characters?gender=${character.gender}`}
                      className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {character.gender}
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 통계 */}
            <Card>
              <CardHeader>
                <CardTitle>통계</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">인기도</p>
                    <p className="text-2xl font-bold">{formatNumber(character.popularity)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">조회수</p>
                    <p className="text-2xl font-bold">
                      {formatNumber(character.viewCount || character.popularity)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 관련 캐릭터 */}
            <Card>
              <CardHeader>
                <CardTitle>관련 캐릭터</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mockCharacters
                    .filter(
                      (char) =>
                        char.id !== character.id &&
                        (char.category === character.category ||
                          char.tags.some((tag) => character.tags.includes(tag)))
                    )
                    .slice(0, 4)
                    .map((char) => (
                      <Link
                        key={char.id}
                        href={`/characters/${char.id}`}
                        className="group"
                      >
                        <div className="aspect-[3/4] relative bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg overflow-hidden mb-2">
                          {char.image ? (
                            <Image
                              src={char.image}
                              alt={char.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl text-gray-400">{char.name[0]}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {char.name}
                        </p>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
