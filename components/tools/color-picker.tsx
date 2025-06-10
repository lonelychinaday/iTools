'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function ColorPicker() {
  const [color, setColor] = useState('#3b82f6');
  const [copied, setCopied] = useState('');
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const copyToClipboard = async (value: string, format: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(format);
      toast({
        title: '复制成功',
        description: `${format} 值已复制到剪贴板`,
      });
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      toast({
        title: '复制失败',
        description: '无法复制到剪贴板',
        variant: 'destructive',
      });
    }
  };

  const presetColors = [
    '#ef4444',
    '#f97316',
    '#f59e0b',
    '#eab308',
    '#84cc16',
    '#22c55e',
    '#10b981',
    '#14b8a6',
    '#06b6d4',
    '#0ea5e9',
    '#3b82f6',
    '#6366f1',
    '#8b5cf6',
    '#a855f7',
    '#d946ef',
    '#ec4899',
    '#f43f5e',
    '#64748b',
  ];

  return (
    <div className='p-6 space-y-6'>
      {/* 页面标题区域 */}
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>颜色选择器</h1>
        <p className='text-muted-foreground'>颜色格式转换和调色板工具</p>
      </div>

      {/* 主要内容区域 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* 颜色选择面板 */}
        <Card>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>颜色选择</CardTitle>
            <CardDescription>选择或输入颜色值</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* 颜色选择器 */}
            <div className='space-y-4'>
              <div className='space-y-3'>
                <Label className='text-sm font-medium'>颜色选择器</Label>
                <div className='flex gap-4 items-center'>
                  <input
                    type='color'
                    value={color}
                    onChange={e => setColor(e.target.value)}
                    className='w-16 h-16 rounded-lg border border-border cursor-pointer'
                  />
                  <div
                    className='flex-1 h-16 rounded-lg border border-border'
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>

              <div className='space-y-3'>
                <Label className='text-sm font-medium'>HEX 值</Label>
                <Input
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  placeholder='#000000'
                  className='font-mono'
                />
              </div>
            </div>

            {/* 预设颜色 */}
            <div className='space-y-3'>
              <Label className='text-sm font-medium'>预设颜色</Label>
              <div className='grid grid-cols-6 gap-2'>
                {presetColors.map(presetColor => (
                  <button
                    key={presetColor}
                    onClick={() => setColor(presetColor)}
                    className='w-10 h-10 rounded-md border-2 border-transparent hover:border-border transition-colors shadow-sm'
                    style={{ backgroundColor: presetColor }}
                    title={presetColor}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 颜色格式面板 */}
        <Card>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>颜色格式</CardTitle>
            <CardDescription>不同格式的颜色值</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {/* HEX 格式 */}
            <div className='space-y-3'>
              <Label className='text-sm font-medium'>HEX</Label>
              <div className='flex gap-2'>
                <Input
                  value={color.toUpperCase()}
                  readOnly
                  className='font-mono text-sm'
                />
                <Button
                  variant='outline'
                  size='sm'
                  className='h-10 w-10 p-0'
                  onClick={() => copyToClipboard(color.toUpperCase(), 'HEX')}
                >
                  {copied === 'HEX' ? (
                    <Check className='h-4 w-4 text-green-600' />
                  ) : (
                    <Copy className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </div>

            {/* RGB 格式 */}
            {rgb && (
              <div className='space-y-3'>
                <Label className='text-sm font-medium'>RGB</Label>
                <div className='flex gap-2'>
                  <Input
                    value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                    readOnly
                    className='font-mono text-sm'
                  />
                  <Button
                    variant='outline'
                    size='sm'
                    className='h-10 w-10 p-0'
                    onClick={() =>
                      copyToClipboard(
                        `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                        'RGB'
                      )
                    }
                  >
                    {copied === 'RGB' ? (
                      <Check className='h-4 w-4 text-green-600' />
                    ) : (
                      <Copy className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* HSL 格式 */}
            {hsl && (
              <div className='space-y-3'>
                <Label className='text-sm font-medium'>HSL</Label>
                <div className='flex gap-2'>
                  <Input
                    value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                    readOnly
                    className='font-mono text-sm'
                  />
                  <Button
                    variant='outline'
                    size='sm'
                    className='h-10 w-10 p-0'
                    onClick={() =>
                      copyToClipboard(
                        `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
                        'HSL'
                      )
                    }
                  >
                    {copied === 'HSL' ? (
                      <Check className='h-4 w-4 text-green-600' />
                    ) : (
                      <Copy className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* 颜色详细信息 */}
            <div className='p-4 rounded-lg bg-muted/30 space-y-2'>
              <div className='text-sm font-medium'>颜色信息</div>
              <div className='grid grid-cols-3 gap-4 text-xs text-muted-foreground'>
                {rgb && (
                  <>
                    <div>R: {rgb.r}</div>
                    <div>G: {rgb.g}</div>
                    <div>B: {rgb.b}</div>
                  </>
                )}
              </div>
              <div className='grid grid-cols-3 gap-4 text-xs text-muted-foreground'>
                {hsl && (
                  <>
                    <div>H: {hsl.h}°</div>
                    <div>S: {hsl.s}%</div>
                    <div>L: {hsl.l}%</div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 颜色对比和辅助信息 */}
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle className='text-lg'>颜色对比</CardTitle>
          <CardDescription>查看颜色在不同背景下的效果</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='space-y-2'>
              <div className='text-sm font-medium'>白色背景</div>
              <div
                className='h-16 rounded-lg border flex items-center justify-center text-sm font-medium'
                style={{ backgroundColor: '#ffffff', color: color }}
              >
                示例文本
              </div>
            </div>
            <div className='space-y-2'>
              <div className='text-sm font-medium'>黑色背景</div>
              <div
                className='h-16 rounded-lg border flex items-center justify-center text-sm font-medium'
                style={{ backgroundColor: '#000000', color: color }}
              >
                示例文本
              </div>
            </div>
            <div className='space-y-2'>
              <div className='text-sm font-medium'>灰色背景</div>
              <div
                className='h-16 rounded-lg border flex items-center justify-center text-sm font-medium'
                style={{ backgroundColor: '#6b7280', color: color }}
              >
                示例文本
              </div>
            </div>
            <div className='space-y-2'>
              <div className='text-sm font-medium'>颜色背景</div>
              <div
                className='h-16 rounded-lg border flex items-center justify-center text-sm font-medium text-white'
                style={{ backgroundColor: color }}
              >
                示例文本
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 使用说明 */}
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle className='text-lg'>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground'>
            <div className='space-y-2'>
              <h4 className='font-medium text-foreground'>支持格式</h4>
              <ul className='space-y-1'>
                <li>• HEX: #RRGGBB 格式</li>
                <li>• RGB: rgb(r, g, b) 格式</li>
                <li>• HSL: hsl(h, s%, l%) 格式</li>
              </ul>
            </div>
            <div className='space-y-2'>
              <h4 className='font-medium text-foreground'>功能特点</h4>
              <ul className='space-y-1'>
                <li>• 实时颜色格式转换</li>
                <li>• 预设颜色快速选择</li>
                <li>• 颜色对比度预览</li>
                <li>• 一键复制颜色值</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
