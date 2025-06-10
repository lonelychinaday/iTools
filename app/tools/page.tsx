'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  Search,
  Menu,
  ChevronLeft,
  Grid3X3,
  Sidebar,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toolCategories } from '@/lib/tools';
import { cn } from '@/lib/utils';

export default function ToolsPage() {
  const router = useRouter();

  // 处理工具选择 - 跳转到对应路由
  const handleToolSelect = (toolId: string) => {
    router.push(`/tools/${toolId}`);
  };

  return (
    <div className='overflow-auto md:absolute md:inset-0'>
      <div className='p-6 space-y-6'>
        {/* 页面标题区域 */}
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            欢迎使用iTools工具箱
          </h1>
          <p className='text-muted-foreground'>
            这里集合了各种实用的开发工具，帮助您高效完成工作
          </p>
        </div>

        {/* 布局介绍区域 */}
        <Card>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>使用指南</CardTitle>
            <CardDescription>了解如何使用iTools工具箱</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* 侧边栏使用说明 */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Sidebar className='h-5 w-5 text-accent-foreground' />
                    <h3 className='font-medium text-lg'>导航侧边栏</h3>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    左侧侧边栏包含了所有工具分类，点击分类标题可以展开或折叠
                  </p>
                </div>
                <div className='space-y-1 text-sm text-muted-foreground ml-2'>
                  <div className='flex items-center gap-2'>
                    <ChevronRight className='h-4 w-4 flex-shrink-0' />
                    <span>点击工具名称进入对应工具页面</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <ChevronRight className='h-4 w-4 flex-shrink-0' />
                    <span>点击分类名称展开所有工具</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <ChevronRight className='h-4 w-4 flex-shrink-0' />
                    <span>
                      使用
                      <ChevronLeft className='h-3.5 w-3.5 inline-block mx-1' />
                      按钮可以折叠侧边栏
                    </span>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Search className='h-5 w-5 text-accent-foreground' />
                    <h3 className='font-medium text-lg'>搜索功能</h3>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    顶部导航栏的搜索框可以帮助您快速找到需要的工具
                  </p>
                </div>
                <div className='space-y-1 text-sm text-muted-foreground ml-2'>
                  <div className='flex items-center gap-2'>
                    <ChevronRight className='h-4 w-4 flex-shrink-0' />
                    <span>输入工具名称或描述进行搜索</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <ChevronRight className='h-4 w-4 flex-shrink-0' />
                    <span>搜索结果会实时显示在侧边栏中</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Menu className='h-4 w-4 flex-shrink-0' />
                    <span>在手机上，点击左上角的菜单图标打开侧边栏</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 工具分类区域 */}
        <div className='space-y-6'>
          <h2 className='text-xl font-semibold tracking-tight'>
            选择工具开始使用
          </h2>

          {/* 工具分类网格 */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {toolCategories.map(category => (
              <Card
                key={category.id}
                className='overflow-hidden border-border/40'
              >
                <CardHeader className='pb-4 bg-muted/30'>
                  <div className='flex items-center gap-2'>
                    <category.icon className='h-5 w-5 text-accent-foreground' />
                    <CardTitle className='text-base'>{category.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className='pt-4 space-y-3'>
                  {category.tools.map(tool => (
                    <div
                      key={tool.id}
                      className='flex items-center justify-between p-2 rounded-md hover:bg-muted/70 cursor-pointer transition-colors'
                      onClick={() => handleToolSelect(tool.id)}
                    >
                      <div className='flex items-center gap-2'>
                        <tool.icon className='h-4 w-4 text-muted-foreground' />
                        <span className='text-sm'>{tool.name}</span>
                      </div>
                      <ChevronRight className='h-4 w-4 text-muted-foreground' />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 快速开始区域 */}
        <Card className='border-accent/40 bg-muted/20'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>快速开始</CardTitle>
            <CardDescription>选择一个热门工具立即开始使用</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
              {toolCategories.flatMap(category =>
                category.tools.slice(0, 2).map(tool => (
                  <Button
                    key={tool.id}
                    variant='outline'
                    className='justify-start h-10'
                    onClick={() => handleToolSelect(tool.id)}
                  >
                    <tool.icon className='h-4 w-4 mr-2' />
                    {tool.name}
                  </Button>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
