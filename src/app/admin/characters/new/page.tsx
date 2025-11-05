"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { CharacterPrompt } from "@/lib/character-prompts"

export default function NewCharacterPromptPage() {
  const router = useRouter()

  const [formData, setFormData] = useState<CharacterPrompt>({
    characterId: "",
    systemPrompt: "",
    worldSetting: "",
    personality: "",
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch("/api/admin/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        alert("캐릭터 프롬프트가 성공적으로 저장되었습니다.")
        router.push("/admin/characters")
      } else {
        alert(data.error || "저장 중 오류가 발생했습니다.")
      }
    } catch (error) {
      console.error("Error saving prompt:", error)
      alert("저장 중 오류가 발생했습니다.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/characters")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로
          </Button>
          <h1 className="text-3xl font-bold">새 캐릭터 프롬프트 추가</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            새로운 캐릭터의 대화 프롬프트를 추가하세요.
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                캐릭터 ID
              </label>
              <input
                type="text"
                value={formData.characterId}
                onChange={(e) =>
                  setFormData({ ...formData, characterId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-700"
                placeholder="예: 1, 2, 3..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                시스템 프롬프트 (System Prompt)
              </label>
              <textarea
                value={formData.systemPrompt}
                onChange={(e) =>
                  setFormData({ ...formData, systemPrompt: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-700"
                placeholder="예: 당신은 카시안입니다. 사용자와 정략결혼한 사이로..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                세계관 설정 (World Setting)
              </label>
              <textarea
                value={formData.worldSetting}
                onChange={(e) =>
                  setFormData({ ...formData, worldSetting: e.target.value })
                }
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-700"
                placeholder="캐릭터가 살고 있는 세계관과 배경 설정을 입력하세요..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                성격 (Personality)
              </label>
              <textarea
                value={formData.personality}
                onChange={(e) =>
                  setFormData({ ...formData, personality: e.target.value })
                }
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-700"
                placeholder="캐릭터의 성격, 말투, 대화 스타일 등을 입력하세요..."
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    저장
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/characters")}
              >
                취소
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
