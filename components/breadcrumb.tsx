"use client"

import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toolCategories } from "@/lib/tools"

interface BreadcrumbProps {
  selectedTool: string
  onToolSelect: (toolId: string) => void
}

export function Breadcrumb({ selectedTool, onToolSelect }: BreadcrumbProps) {
  // 找到当前工具所属的分类和工具信息
  let currentCategory = null
  let currentTool = null

  for (const category of toolCategories) {
    const tool = category.tools.find(t => t.id === selectedTool)
    if (tool) {
      currentCategory = category
      currentTool = tool
      break
    }
  }

  if (!currentCategory || !currentTool) {
    return null
  }

  return (
    <div className="flex items-center text-sm">
      {/* 分类下拉菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="h-auto p-0 text-sm text-muted-foreground rounded-md px-1 gap-0.5 hover-green"
          >
            {currentCategory.name}
            <ChevronsUpDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {toolCategories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => {
                // 切换到该分类的第一个工具
                if (category.tools.length > 0) {
                  onToolSelect(category.tools[0].id)
                }
              }}
              className="flex items-center gap-2 hover-green"
            >
              <category.icon className="h-4 w-4" />
              {category.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <span aria-hidden="true" className="text-muted-foreground/40 w-4 min-w-4 select-none text-center text-lg mx-1">/</span>
      
      {/* 工具下拉菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="h-auto p-0 text-sm text-foreground rounded-md px-1 gap-0.5 hover-green"
          >
            {currentTool.name}
            <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {currentCategory.tools.map((tool) => (
            <DropdownMenuItem
              key={tool.id}
              onClick={() => onToolSelect(tool.id)}
              className="flex items-center gap-2 hover-green"
            >
              <tool.icon className="h-4 w-4" />
              {tool.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 