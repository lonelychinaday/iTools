'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/ui/logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toolCategories } from '@/lib/tools';
import { cn } from '@/lib/utils';

interface ToolHomeProps {
  onToolSelect: (toolId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ToolHome({
  onToolSelect,
  searchQuery,
  onSearchChange,
}: ToolHomeProps) {
  // 获取所有工具的平铺列表
  const allTools = toolCategories.flatMap(category =>
    category.tools.map(tool => ({
      ...tool,
      categoryName: category.name,
      categoryId: category.id,
    }))
  );

  // 根据搜索查询过滤工具
  const filteredTools = allTools.filter(
    tool =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='min-h-full'>
      {/* 顶部区域 */}
      <div className='relative'>
        <div className='max-w-6xl mx-auto px-6 py-12'>
          <div className='text-center space-y-4'>
            {/* Logo */}
            <div className='flex justify-center mb-6'>
              <Logo />
            </div>

            <h1 className='text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#1ABAFA] via-[#0891b2] to-[#28E361] bg-clip-text text-transparent'>
              欢迎使用{' '}
              <span className='font-lilita-one tracking-wider'>iTools</span>
            </h1>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              一个强大的在线工具集合，为开发者和日常使用提供便利的实用工具
            </p>

            {/* 搜索框 */}
            <div className='max-w-md mx-auto mt-8'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none' />
                <Input
                  placeholder='搜索工具'
                  value={searchQuery}
                  onChange={e => onSearchChange(e.target.value)}
                  className='pl-10 pr-10 h-11 bg-background/50 border border-border/50 backdrop-blur-sm focus:bg-background transition-colors relative z-0'
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10'
                  >
                    <X className='h-4 w-4' />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 工具展示区域 */}
      <div className='max-w-6xl mx-auto px-6 py-8 relative'>
        {/* 工具展示 */}
        <div>
          {searchQuery && (
            <h2 className='text-2xl font-semibold mb-6 text-slate-700 dark:text-slate-300'>
              搜索结果 ({filteredTools.length})
            </h2>
          )}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {(searchQuery ? filteredTools : allTools).map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                categoryName={tool.categoryName}
                onSelect={onToolSelect}
              />
            ))}
          </div>
          {searchQuery && filteredTools.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-muted-foreground text-lg'>未找到匹配的工具</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<any>;
  };
  categoryName: string;
  onSelect: (toolId: string) => void;
}

function ToolCard({ tool, categoryName, onSelect }: ToolCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-border/40',
        'bg-card/60 backdrop-blur-md hover:bg-card/90 shadow-sm'
      )}
      onClick={() => onSelect(tool.id)}
    >
      <CardHeader className='pb-2 pt-4 px-4'>
        <div className='flex items-center justify-between mb-2'>
          <tool.icon className='h-6 w-6 text-accent-foreground' />
          <Badge
            variant='secondary'
            className='text-xs px-2 py-0.5 text-muted-foreground'
          >
            {categoryName}
          </Badge>
        </div>
        <CardTitle className='text-base leading-tight text-accent-foreground'>
          {tool.name}
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-0 px-4 pb-4'>
        <CardDescription className='text-sm leading-relaxed text-muted-foreground'>
          {tool.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
