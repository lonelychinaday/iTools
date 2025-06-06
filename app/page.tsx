"use client"

import { useState } from "react"
import { Search, Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToolSidebar } from "@/components/tool-sidebar"
import { ToolContent } from "@/components/tool-content"
import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from "next-themes"

export default function Home() {
  const [selectedTool, setSelectedTool] = useState("json-formatter")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <h1 className="text-xl font-bold">开发者工具箱</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="搜索工具..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <div
            className={`
            fixed inset-y-0 left-0 z-40 w-80 transform transition-transform duration-200 ease-in-out
            md:relative md:translate-x-0 md:z-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          >
            <ToolSidebar
              selectedTool={selectedTool}
              onToolSelect={setSelectedTool}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Main Content */}
          <main className="flex-1 min-h-[calc(100vh-4rem)]">
            <ToolContent selectedTool={selectedTool} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">切换主题</span>
    </Button>
  )
}
