/**
 * SearchBox 组件使用示例
 *
 * 这个文件展示了如何在不同场景下使用 SearchBox 组件
 * 不会被打包到生产代码中，仅用于开发参考
 */

'use client';

import { useState } from 'react';
import { SearchBox } from './search-box';

export function SearchBoxExamples() {
  const [searchValue1, setSearchValue1] = useState('');
  const [searchValue2, setSearchValue2] = useState('');
  const [searchValue3, setSearchValue3] = useState('');
  const [searchValue4, setSearchValue4] = useState('');

  return (
    <div className='p-6 space-y-8'>
      <h1 className='text-2xl font-bold'>SearchBox 组件示例</h1>

      {/* 基础用法 */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold'>基础用法</h2>
        <SearchBox
          value={searchValue1}
          onChange={setSearchValue1}
          placeholder='基础搜索框'
        />
      </div>

      {/* 不同尺寸 */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold'>不同尺寸</h2>
        <div className='space-y-3'>
          <div>
            <p className='text-sm text-muted-foreground mb-2'>小尺寸 (sm)</p>
            <SearchBox
              value={searchValue2}
              onChange={setSearchValue2}
              placeholder='小尺寸搜索框'
              size='sm'
              className='w-60'
            />
          </div>
          <div>
            <p className='text-sm text-muted-foreground mb-2'>
              中等尺寸 (md) - 默认
            </p>
            <SearchBox
              value={searchValue3}
              onChange={setSearchValue3}
              placeholder='中等尺寸搜索框'
              size='md'
              className='w-60'
            />
          </div>
          <div>
            <p className='text-sm text-muted-foreground mb-2'>大尺寸 (lg)</p>
            <SearchBox
              value={searchValue4}
              onChange={setSearchValue4}
              placeholder='大尺寸搜索框'
              size='lg'
              className='w-60'
            />
          </div>
        </div>
      </div>

      {/* 不同样式变体 */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold'>不同样式变体</h2>
        <div className='space-y-3'>
          <div>
            <p className='text-sm text-muted-foreground mb-2'>
              默认样式 (default)
            </p>
            <SearchBox
              value={searchValue1}
              onChange={setSearchValue1}
              placeholder='默认样式'
              variant='default'
              className='w-60'
            />
          </div>
          <div>
            <p className='text-sm text-muted-foreground mb-2'>
              头部样式 (header)
            </p>
            <SearchBox
              value={searchValue2}
              onChange={setSearchValue2}
              placeholder='头部搜索框'
              variant='header'
              size='sm'
              className='w-60'
            />
          </div>
          <div>
            <p className='text-sm text-muted-foreground mb-2'>
              首页样式 (home)
            </p>
            <SearchBox
              value={searchValue3}
              onChange={setSearchValue3}
              placeholder='首页搜索框'
              variant='home'
              size='lg'
              className='w-60'
            />
          </div>
        </div>
      </div>

      {/* 自定义配置 */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold'>自定义配置</h2>
        <div className='space-y-3'>
          <div>
            <p className='text-sm text-muted-foreground mb-2'>禁用清除按钮</p>
            <SearchBox
              value={searchValue1}
              onChange={setSearchValue1}
              placeholder='无清除按钮'
              showClearButton={false}
              className='w-60'
            />
          </div>
          <div>
            <p className='text-sm text-muted-foreground mb-2'>禁用状态</p>
            <SearchBox
              value='禁用的搜索框'
              onChange={() => {}}
              placeholder='禁用状态'
              disabled={true}
              className='w-60'
            />
          </div>
        </div>
      </div>

      {/* 实际应用场景 */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold'>实际应用场景</h2>
        <div className='space-y-6'>
          {/* 模拟header搜索 */}
          <div className='border rounded-lg p-4 bg-muted/20'>
            <p className='text-sm text-muted-foreground mb-3'>头部导航栏搜索</p>
            <div className='flex items-center justify-between h-12 px-4 bg-background border rounded-md'>
              <div className='flex items-center gap-2'>
                <span className='font-medium'>iTools</span>
              </div>
              <div className='flex items-center gap-2'>
                <SearchBox
                  value={searchValue1}
                  onChange={setSearchValue1}
                  placeholder='搜索工具...'
                  size='sm'
                  variant='header'
                  className='w-48'
                />
              </div>
            </div>
          </div>

          {/* 模拟首页搜索 */}
          <div className='border rounded-lg p-6 bg-muted/20'>
            <p className='text-sm text-muted-foreground mb-4'>首页主搜索</p>
            <div className='text-center space-y-4'>
              <h3 className='text-2xl font-bold'>欢迎使用 iTools</h3>
              <p className='text-muted-foreground'>强大的在线工具集合</p>
              <div className='max-w-md mx-auto'>
                <SearchBox
                  value={searchValue2}
                  onChange={setSearchValue2}
                  placeholder='搜索工具'
                  size='lg'
                  variant='home'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
