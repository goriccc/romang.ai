import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { characterPrompts } from "@/lib/character-prompts"
import { CharacterPrompt } from "@/lib/character-prompts"

export async function GET() {
  try {
    return NextResponse.json({
      prompts: characterPrompts,
    })
  } catch (error) {
    console.error("Error fetching character prompts:", error)
    return NextResponse.json(
      {
        error: "프롬프트를 불러오는 중 오류가 발생했습니다.",
        prompts: {},
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: CharacterPrompt = await req.json()

    // 필수 필드 검증
    if (!data.characterId || !data.systemPrompt || !data.worldSetting || !data.personality) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      )
    }

    // character-prompts.ts 파일 경로
    const filePath = path.join(process.cwd(), "src/lib/character-prompts.ts")

    // 새로운 프롬프트 추가 또는 업데이트
    const newPrompt = {
      characterId: data.characterId,
      systemPrompt: data.systemPrompt,
      worldSetting: data.worldSetting,
      personality: data.personality,
    }

    // characterPrompts 객체에 추가
    const updatedPrompts = {
      ...characterPrompts,
      [data.characterId]: newPrompt,
    }

    // 파일 내용 재생성
    // characterPrompts 객체를 문자열로 변환
    const escapeTemplateLiteral = (str: string): string => {
      return str
        .replace(/\\/g, "\\\\") // 백슬래시 먼저 이스케이프
        .replace(/`/g, "\\`") // 백틱 이스케이프
        .replace(/\${/g, "\\${") // 템플릿 리터럴 변수 이스케이프
    }

    const promptsString = Object.entries(updatedPrompts)
      .map(([id, prompt]) => {
        return `  "${id}": {
    characterId: "${prompt.characterId}",
    systemPrompt: \`${escapeTemplateLiteral(prompt.systemPrompt)}\`,
    worldSetting: \`${escapeTemplateLiteral(prompt.worldSetting)}\`,
    personality: \`${escapeTemplateLiteral(prompt.personality)}\`,
  },`
      })
      .join("\n")

    // 전체 파일 내용 재구성
    const newFileContent = `export interface CharacterPrompt {
  characterId: string
  systemPrompt: string
  worldSetting: string
  personality: string
}

export const characterPrompts: Record<string, CharacterPrompt> = {
${promptsString}
}
`

    // 파일 쓰기
    fs.writeFileSync(filePath, newFileContent, "utf-8")

    return NextResponse.json({
      success: true,
      message: "캐릭터 프롬프트가 성공적으로 저장되었습니다.",
    })
  } catch (error) {
    console.error("Error saving character prompt:", error)
    return NextResponse.json(
      {
        error: "저장 중 오류가 발생했습니다.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
