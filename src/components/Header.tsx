"use client"

import Link from "next/link"
import { Bell, Home, Search, User, Menu } from "lucide-react"
import { Button } from "./ui/Button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            로망
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            홈
          </Link>
          <Link
            href="/characters"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            캐릭터
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            카테고리
          </Link>
          <Link
            href="/tags"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            태그
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="relative p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <User className="h-4 w-4 mr-2" />
            반가워요!
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            로그인 해주세요
          </Button>
          <button className="md:hidden p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
