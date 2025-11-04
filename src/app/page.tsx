import CharacterSection from "@/components/CharacterSection"
import Header from "@/components/Header"
import { mockCharacters } from "@/lib/mock-data"

export default function Home() {
  // 신작 캐릭터 (최근 7일 이내 생성)
  const newCharacters = mockCharacters
    .filter((char) => {
      const daysSinceCreation = Math.floor(
        (new Date().getTime() - char.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      )
      return daysSinceCreation <= 7
    })
    .slice(0, 12)

  // 인기 급상승 캐릭터 (인기순 정렬)
  const popularCharacters = [...mockCharacters]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12)

  // 여주 캐릭터
  const femaleCharacters = mockCharacters
    .filter((char) => char.gender === "여성")
    .slice(0, 12)

  // 남주 캐릭터 (도지헌 → 유진우 → 강호윤 → 카시안 순서)
  const maleCharacters = mockCharacters
    .filter((char) => char.gender === "남성")
    .sort((a, b) => {
      // 도지헌(id: "15")을 맨 앞으로
      if (a.id === "15") return -1
      if (b.id === "15") return 1
      // 유진우(id: "17")을 두 번째로
      if (a.id === "17") return -1
      if (b.id === "17") return 1
      // 강호윤(id: "2")을 세 번째로
      if (a.id === "2") return -1
      if (b.id === "2") return 1
      // 카시안(id: "1")을 네 번째로
      if (a.id === "1") return -1
      if (b.id === "1") return 1
      return 0
    })
    .slice(0, 12)

  // 판타지 캐릭터
  const fantasyCharacters = mockCharacters
    .filter((char) => char.category === "판타지" || char.category === "로맨스판타지")
    .slice(0, 12)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI 캐릭터와 함께하는
              <br />
              로맨스 판타지 스토리
            </h1>
            <p className="text-xl mb-8 opacity-90">
              설렘, 낭만, 그리고 판타지.
              <br />
              로망은 당신이 원하는 모든 대화를 현실로 만듭니다.
              <br />
              생생한 AI 캐릭터와 함께하는 몰입형 채팅으로 오늘 당신의 로망이 시작됩니다.
            </p>
          </div>
        </section>

        {/* 알림 섹션 */}
        <section className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">알림</h2>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  공지
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  알림
                </a>
              </div>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                더보기
              </a>
            </div>
          </div>
        </section>

        {/* 네비게이션 메뉴 */}
        <section className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-6 overflow-x-auto py-4">
              <a
                href="#"
                className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                추천
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white whitespace-nowrap"
              >
                신작
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white whitespace-nowrap"
              >
                랭킹
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white whitespace-nowrap"
              >
                카테고리
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white whitespace-nowrap"
              >
                태그
              </a>
            </div>
          </div>
        </section>

        {/* 신작 캐릭터 */}
        {newCharacters.length > 0 && (
          <CharacterSection
            title="🌟 따끈따끈한 신작 캐릭터"
            characters={newCharacters}
            viewAllHref="/characters?sort=newest"
          />
        )}

        {/* 여주 캐릭터 */}
        {femaleCharacters.length > 0 && (
          <CharacterSection
            title="💗 설렘 가득 로맨스 여주"
            characters={femaleCharacters}
            viewAllHref="/characters?gender=여성"
          />
        )}

        {/* 남주 캐릭터 */}
        {maleCharacters.length > 0 && (
          <CharacterSection
            title="🎩 매력 만점 로맨스 남주"
            characters={maleCharacters}
            viewAllHref="/characters?gender=남성"
          />
        )}

        {/* 인기 급상승 */}
        <CharacterSection
          title="🔥 인기 급상승 캐릭터"
          characters={popularCharacters}
          viewAllHref="/characters?sort=popularity"
        />

        {/* 판타지 캐릭터 */}
        {fantasyCharacters.length > 0 && (
          <CharacterSection
            title="🏰 판타지 속 감성 로맨스"
            characters={fantasyCharacters}
            viewAllHref="/characters?category=판타지"
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">홈</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                    문의하기
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                    이용약관
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                    개인정보취급방침
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                    AI 캐릭터 정책
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2025 Romang AI, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
