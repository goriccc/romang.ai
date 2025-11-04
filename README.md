# Romang AI

AI 캐릭터 기반 로맨스 판타지 플랫폼

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom Components + Lucide React Icons
- **Form Handling**: React Hook Form + Zod
- **AI**: Anthropic Claude AI
- **Deployment**: Vercel

## 프로젝트 구조

```
romang/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # 루트 레이아웃
│   │   ├── page.tsx      # 홈 페이지
│   │   ├── chat/[characterId]/  # 채팅 페이지
│   │   └── api/          # API Routes
│   │       └── chat/     # Claude AI 채팅 API
│   ├── components/       # React 컴포넌트
│   │   └── ui/          # 재사용 가능한 UI 컴포넌트
│   └── lib/             # 유틸리티 함수 및 헬퍼
│       ├── utils.ts     # 유틸리티 함수
│       ├── types.ts     # TypeScript 타입 정의
│       └── character-prompts.ts  # 캐릭터별 프롬프트 설정
├── public/              # 정적 파일
└── package.json
```

## 시작하기

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 Claude API 키를 추가하세요:

```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열고 API 키를 입력하세요:

```
ANTHROPIC_API_KEY=your_api_key_here
```

**Claude API 키 발급 방법:**
1. [Anthropic Console](https://console.anthropic.com/) 접속
2. 계정 생성 또는 로그인
3. API Keys 메뉴에서 새 API 키 생성
4. 생성된 키를 `.env.local`에 입력

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

### 린트 실행

```bash
npm run lint
```

## 주요 기능

- ✅ Next.js 16 App Router 설정
- ✅ TypeScript 구성
- ✅ Tailwind CSS 설정
- ✅ SEO 최적화 (메타데이터, Open Graph)
- ✅ 반응형 디자인 준비
- ✅ 유틸리티 함수 및 타입 정의
- ✅ Claude AI 기반 채팅 기능
- ✅ 캐릭터별 개성 있는 대화

## 캐릭터 프롬프트 설정

`src/lib/character-prompts.ts` 파일에서 각 캐릭터의 시스템 프롬프트를 설정할 수 있습니다.

각 캐릭터마다 다음 정보를 설정하세요:
- **systemPrompt**: 캐릭터 기본 설정
- **worldSetting**: 세계관 및 배경 설정
- **personality**: 성격 및 말투

## 다음 단계

- [x] 데이터베이스 연결 (Supabase 또는 Prisma)
- [x] 인증 시스템 구축
- [x] 캐릭터 목록 페이지
- [x] 캐릭터 상세 페이지
- [x] 카테고리 및 태그 필터링
- [x] 검색 기능
- [x] AI 채팅 기능
- [ ] 사용자 대시보드
- [ ] 채팅 히스토리 저장
- [ ] 이미지 생성 기능

## 배포

이 프로젝트는 Vercel에 최적화되어 있습니다.

1. GitHub 저장소에 코드를 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 가져오기
3. 환경 변수 설정 (Vercel 대시보드에서 ANTHROPIC_API_KEY 추가)
4. 자동 배포 완료

## 라이선스

Private
