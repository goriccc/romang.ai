"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/Header"
import { mockCharacters } from "@/lib/mock-data"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ArrowLeft, Send, Loader2 } from "lucide-react"
import Image from "next/image"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const characterId = params.characterId as string
  const character = mockCharacters.find((char) => char.id === characterId)

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: character
        ? characterId === "1"
          ? "안녕하세요! 저는 국내 최고권위 정신건강의학과 이안백 원장입니다.  무엇이든 편하게 물어보세요!"
          : characterId === "2"
          ? "안녕하세요! 저는 강호윤입니다. 도은리 유일 슈퍼의 주인이에요"
          : `안녕하세요! 저는 ${character.name}입니다. ${character.description} 무엇이든 편하게 물어보세요!`
        : "안녕하세요! 무엇이든 편하게 물어보세요!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          characterId,
          messages: [...messages, userMessage],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMsg = data.details 
          ? `${data.error}\n${data.details}` 
          : data.error || "오류가 발생했습니다."
        throw new Error(errorMsg)
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error: any) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: error.message || "죄송해요, 잠시 문제가 생겼어요. 다시 시도해주세요.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // 액션 설명(별표로 감싼 텍스트) 렌더링 함수
  const renderMessageContent = (content: string) => {
    // *텍스트* 패턴을 찾아서 처리
    const parts = content.split(/(\*[^*]+\*)/g)
    
    return parts.map((part, index) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        // 액션 설명: 연한 색상과 이탤릭체로 표시
        const actionText = part.slice(1, -1)
        return (
          <span
            key={index}
            className="text-gray-500 dark:text-gray-400 italic text-sm"
          >
            *{actionText}*
          </span>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            캐릭터를 찾을 수 없습니다.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="mt-4"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-4 flex flex-col max-w-4xl">
        {/* 캐릭터 정보 헤더 */}
        <div className="mb-4 flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            뒤로
          </Button>
          <div className="flex items-center gap-3">
            {character.thumbnail && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={character.thumbnail}
                  alt={character.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="font-semibold text-lg">{character.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {character.description}
              </p>
            </div>
          </div>
        </div>

        {/* 채팅 메시지 영역 */}
        <Card className="flex-1 flex flex-col p-4 mb-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {renderMessageContent(message.content)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-800 rounded-lg px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white"
              disabled={isLoading}
            />
            <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
