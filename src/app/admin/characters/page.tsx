"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Plus, Edit, MessageSquare } from "lucide-react"
import { mockCharacters } from "@/lib/mock-data"

export default function CharacterPromptsPage() {
  const router = useRouter()
  const [characters, setCharacters] = useState<
    Array<{
      id: string
      name: string
      hasPrompt: boolean
    }>
  >([])

  useEffect(() => {
    // API를 통해 캐릭터 프롬프트 상태 가져오기
    const fetchCharacters = async () => {
      try {
        const response = await fetch("/api/admin/characters")
        if (response.ok) {
          const data = await response.json()
          const chars = mockCharacters.map((char) => ({
            id: char.id,
            name: char.name,
            hasPrompt: data.prompts[char.id] !== undefined,
          }))
          setCharacters(chars)
        } else {
          // API 실패 시 mockCharacters만 사용
          const chars = mockCharacters.map((char) => ({
            id: char.id,
            name: char.name,
            hasPrompt: false,
          }))
          setCharacters(chars)
        }
      } catch (error) {
        // 에러 발생 시 mockCharacters만 사용
        const chars = mockCharacters.map((char) => ({
          id: char.id,
          name: char.name,
          hasPrompt: false,
        }))
        setCharacters(chars)
      }
    }

    fetchCharacters()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">캐릭터 프롬프트 관리</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              캐릭터별 대화 프롬프트를 관리하세요.
            </p>
          </div>
          <Button onClick={() => router.push("/admin/characters/new")}>
            <Plus className="mr-2 h-4 w-4" />
            새 캐릭터 추가
          </Button>
        </div>

        <div className="grid gap-4">
          {characters.map((char) => (
            <Card key={char.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{char.name}</h3>
                    <p className="text-sm text-gray-500">ID: {char.id}</p>
                  </div>
                  <div>
                    {char.hasPrompt ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <MessageSquare className="mr-1 h-3 w-3" />
                        프롬프트 있음
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        프롬프트 없음
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(`/admin/characters/edit/${char.id}`)
                    }
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {char.hasPrompt ? "수정" : "추가"}
                  </Button>
                  {char.hasPrompt && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/chat/${char.id}`)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      테스트
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
