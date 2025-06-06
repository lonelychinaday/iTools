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
    <div className="h-full border-r bg-background">
      <div className="p-4 space-y-4">
        {/* Mobile Search */}
        <div className="relative sm:hidden">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索工具..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tool Categories */}
        <div className="space-y-2">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-between p-2 h-auto"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center gap-2">
                  <category.icon className="h-4 w-4" />
                  <span className="font-medium">{category.name}</span>
                </div>
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>

              {expandedCategories.includes(category.id) && (
                <div className="ml-4 space-y-1">
                  {category.tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start p-2 h-auto text-left",
                        selectedTool === tool.id && "bg-accent text-accent-foreground",
                      )}
                      onClick={() => {
                        onToolSelect(tool.id)
                        onClose()
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <tool.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-medium text-sm">{tool.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{tool.description}</div>
                        </div>
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
  )
}
