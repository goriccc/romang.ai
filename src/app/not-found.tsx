import Link from "next/link"
import Header from "@/components/Header"
import { Button } from "@/components/ui/Button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <Link href="/">
            <Button size="lg">홈으로 돌아가기</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
