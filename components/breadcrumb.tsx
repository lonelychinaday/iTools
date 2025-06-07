"use client"

import { toolCategories } from "@/lib/tools"

interface BreadcrumbProps {
  selectedTool: string
}

export function Breadcrumb({ selectedTool }: BreadcrumbProps) {
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
      <span className="text-muted-foreground">{currentCategory.name}</span>
      <span aria-hidden="true" className="text-muted-foreground/40 w-4 min-w-4 select-none text-center text-lg mx-1">/</span>
      <span className="text-foreground">{currentTool.name}</span>
    </div>
  )
} 