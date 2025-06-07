"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toolCategories } from "@/lib/tools"

interface ToolSidebarProps {
  selectedTool: string
  onToolSelect: (toolId: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onClose: () => void
}

export function ToolSidebar({ selectedTool, onToolSelect, searchQuery, onSearchChange, onClose }: ToolSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["text-tools"])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const filteredCategories = toolCategories
    .map((category) => ({
      ...category,
      tools: category.tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.tools.length > 0)

  return (
    <div className="h-full border-r bg-background flex flex-col">
      {/* Mobile Search - only show on mobile */}
      <div className="px-4 py-3 border-b flex-shrink-0 sm:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索工具..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-8"
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3">
          {/* Tool Categories */}
          <div className="space-y-1.5">
            {filteredCategories.map((category) => (
              <div key={category.id} className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-between px-0 py-1.5 h-auto text-sm hover:bg-muted/50"
                  style={{ color: 'rgb(133, 134, 136)' }}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" style={{ color: 'rgb(133, 134, 136)' }} />
                    <span className="font-normal">{category.name}</span>
                  </div>
                  {expandedCategories.includes(category.id) ? (
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" style={{ color: 'rgb(133, 134, 136)' }} />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" style={{ color: 'rgb(133, 134, 136)' }} />
                  )}
                </Button>

                {expandedCategories.includes(category.id) && (
                  <div className="ml-6 space-y-0.5">
                    {category.tools.map((tool) => (
                                              <Button
                        key={tool.id}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start px-0 py-1 h-auto text-left text-sm hover:bg-muted/70",
                          selectedTool === tool.id ? "bg-accent" : "",
                        )}
                        style={{ 
                          color: 'rgb(51, 54, 57)'
                        }}
                        onClick={() => {
                          onToolSelect(tool.id)
                          onClose()
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <tool.icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'rgb(51, 54, 57)' }} />
                          <span className="text-sm truncate">{tool.name}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
