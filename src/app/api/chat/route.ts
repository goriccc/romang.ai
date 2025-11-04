import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { characterPrompts } from "@/lib/character-prompts"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
  defaultHeaders: {
    "anthropic-version": "2023-06-01", // Anthropic API 버전 지정
  },
})

export async function POST(req: NextRequest) {
  try {
    // API 키 확인
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY가 설정되지 않았습니다.")
      return NextResponse.json(
        { 
          error: "API 키가 설정되지 않았습니다.",
          details: ".env.local 파일에 ANTHROPIC_API_KEY를 설정해주세요."
        },
        { status: 500 }
      )
    }

    const { characterId, messages } = await req.json()

    if (!characterId) {
      return NextResponse.json(
        { error: "캐릭터 ID가 필요합니다." },
        { status: 400 }
      )
    }

    const characterPrompt = characterPrompts[characterId]
    if (!characterPrompt) {
      return NextResponse.json(
        { error: "캐릭터를 찾을 수 없습니다." },
        { status: 404 }
      )
    }

    // 시스템 프롬프트 구성
    const systemPrompt = `${characterPrompt.systemPrompt}

${characterPrompt.worldSetting}

${characterPrompt.personality}

**중요 규칙:**
- 항상 캐릭터의 성격과 세계관을 유지하세요
- 자연스럽고 친근한 대화를 유지하세요
- 상황에 맞는 감정 표현을 사용하세요
- 한국어로 대화하세요
- 짧고 자연스러운 응답을 하세요 (2-3문장 권장)
`

    // Claude API 호출 (Claude Sonnet 4 모델 사용)
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514", // Anthropic에서 제공한 정확한 모델명
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      })),
    })

    const responseText =
      message.content[0].type === "text"
        ? message.content[0].text
        : "죄송해요, 대답을 생성하는데 문제가 생겼어요."

    return NextResponse.json({
      message: responseText,
    })
  } catch (error: any) {
    console.error("Chat API error:", error)
    
    // Anthropic API 관련 에러 처리
    if (error.status === 401 || error.message?.includes("authentication")) {
      return NextResponse.json(
        {
          error: "API 인증에 실패했습니다.",
          details: "ANTHROPIC_API_KEY가 올바르지 않습니다. .env.local 파일을 확인해주세요.",
        },
        { status: 401 }
      )
    }

    if (error.status === 404 || error.error?.type === "not_found_error") {
      return NextResponse.json(
        {
          error: "모델을 찾을 수 없습니다.",
          details: `${error.message || "사용하려는 모델이 존재하지 않습니다."}\n시도한 모델: claude-sonnet-4-20250514`,
          suggestion: "모델명을 확인하거나 Anthropic Console에서 사용 가능한 모델 목록을 확인해주세요.",
        },
        { status: 404 }
      )
    }

    if (error.status === 429) {
      return NextResponse.json(
        {
          error: "API 요청 한도를 초과했습니다.",
          details: "잠시 후 다시 시도해주세요.",
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      {
        error: "대화 생성 중 오류가 발생했습니다.",
        details: error.message || "알 수 없는 오류가 발생했습니다.",
      },
      { status: 500 }
    )
  }
}
