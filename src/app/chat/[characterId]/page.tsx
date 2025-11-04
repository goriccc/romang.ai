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
        ? characterId === "2"
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

  if (!character) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            캐릭터를 찾을 수 없습니다.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            뒤로
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 flex items-center justify-center">
              {character.image ? (
                <Image
                  src={character.image}
                  alt={character.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <span className="text-lg text-gray-400">{character.name[0]}</span>
              )}
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white">
                {character.name}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {character.description}
              </p>
            </div>
          </div>
        </div>

        {/* 채팅 메시지 영역 */}
        <Card className="flex-1 flex flex-col overflow-hidden mb-4">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => {
              // 행동 묘사 (*...*) 감지
              const renderContent = (content: string) => {
                const parts = content.split(/(\*[^*]+\*)/g)
                return parts.map((part, i) => {
                  if (part.startsWith('*') && part.endsWith('*')) {
                    // 행동 묘사는 더 연하게 표시
                    return (
                      <span
                        key={i}
                        className={
                          message.role === "user"
                            ? "text-white/60 italic"
                            : "text-gray-500 dark:text-gray-400 italic"
                        }
                      >
                        {part.slice(1, -1)}
                      </span>
                    )
                  }
                  // 일반 대화 텍스트
                  return <span key={i}>{part}</span>
                })
              }

              return (
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
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {renderContent(message.content)}
                    </p>
                  </div>
                </div>
              )
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* 입력 영역 */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
