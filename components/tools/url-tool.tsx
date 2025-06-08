'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export function UrlTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const encode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (err) {
      toast({
        title: '编码失败',
        description: '输入包含无效字符',
        variant: 'destructive',
      });
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (err) {
      toast({
        title: '解码失败',
        description: '输入不是有效的 URL 编码格式',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: '复制成功',
        description: '结果已复制到剪贴板',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: '复制失败',
        description: '无法复制到剪贴板',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='p-6 space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>URL 编码/解码工具</h1>
        <p className='text-muted-foreground'>URL 格式的编码和解码转换</p>
      </div>

      <Tabs defaultValue='encode' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='encode'>编码</TabsTrigger>
          <TabsTrigger value='decode'>解码</TabsTrigger>
        </TabsList>

        <TabsContent value='encode' className='space-y-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>原始文本</CardTitle>
                <CardDescription>输入需要编码的文本或 URL</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Textarea
                  placeholder='请输入要编码的文本或 URL...'
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className='min-h-[200px]'
                />
                <Button onClick={encode} className='w-full'>
                  URL 编码
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>编码结果</CardTitle>
                <CardDescription>URL 编码后的字符串</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Textarea
                  value={output}
                  readOnly
                  className='min-h-[200px] font-mono'
                  placeholder='编码结果将显示在这里...'
                />
                <Button
                  onClick={copyToClipboard}
                  disabled={!output}
                  variant='outline'
                  className='w-full'
                >
                  {copied ? (
                    <Check className='h-4 w-4 mr-2' />
                  ) : (
                    <Copy className='h-4 w-4 mr-2' />
                  )}
                  {copied ? '已复制' : '复制结果'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='decode' className='space-y-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>URL 编码字符串</CardTitle>
                <CardDescription>输入需要解码的 URL 编码字符串</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Textarea
                  placeholder='请输入 URL 编码字符串...'
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className='min-h-[200px] font-mono'
                />
                <Button onClick={decode} className='w-full'>
                  URL 解码
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>解码结果</CardTitle>
                <CardDescription>解码后的原始文本</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Textarea
                  value={output}
                  readOnly
                  className='min-h-[200px]'
                  placeholder='解码结果将显示在这里...'
                />
                <Button
                  onClick={copyToClipboard}
                  disabled={!output}
                  variant='outline'
                  className='w-full'
                >
                  {copied ? (
                    <Check className='h-4 w-4 mr-2' />
                  ) : (
                    <Copy className='h-4 w-4 mr-2' />
                  )}
                  {copied ? '已复制' : '复制结果'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2 text-sm text-muted-foreground'>
            <li>• URL 编码用于将特殊字符转换为可在 URL 中安全传输的格式</li>
            <li>• 常用于处理 URL 参数中的中文字符和特殊符号</li>
            <li>• 编码：将普通文本转换为 URL 编码格式（如空格变为 %20）</li>
            <li>• 解码：将 URL 编码格式转换回原始文本</li>
            <li>• 支持中文字符和各种特殊符号的编码解码</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
