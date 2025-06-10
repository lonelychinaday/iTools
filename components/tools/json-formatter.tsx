'use client';

import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError('无效的 JSON 格式');
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError('无效的 JSON 格式');
      setOutput('');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: '复制成功',
        description: 'JSON 已复制到剪贴板',
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

  const downloadJson = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='p-6 space-y-6'>
      {/* 页面标题区域 */}
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>JSON 格式化工具</h1>
        <p className='text-muted-foreground'>格式化、压缩和验证 JSON 数据</p>
      </div>

      {/* 主要内容区域 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* 输入面板 */}
        <Card className='flex flex-col'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>输入 JSON</CardTitle>
            <CardDescription>粘贴或输入需要格式化的 JSON 数据</CardDescription>
          </CardHeader>
          <CardContent className='flex-1 flex flex-col space-y-4'>
            <Textarea
              placeholder='请输入 JSON 数据...'
              value={input}
              onChange={e => setInput(e.target.value)}
              className='flex-1 min-h-[300px] font-mono text-sm resize-none'
            />
            <div className='flex gap-3'>
              <Button onClick={formatJson} className='flex-1 h-10'>
                格式化
              </Button>
              <Button
                onClick={minifyJson}
                variant='outline'
                className='flex-1 h-10'
              >
                压缩
              </Button>
            </div>
            {error && (
              <div className='text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20'>
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 输出面板 */}
        <Card className='flex flex-col'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>格式化结果</CardTitle>
            <CardDescription>格式化后的 JSON 数据</CardDescription>
          </CardHeader>
          <CardContent className='flex-1 flex flex-col space-y-4'>
            <Textarea
              value={output}
              readOnly
              className='flex-1 min-h-[300px] font-mono text-sm resize-none'
              placeholder='格式化结果将显示在这里...'
            />
            <div className='flex gap-3'>
              <Button
                onClick={copyToClipboard}
                disabled={!output}
                variant='outline'
                className='flex-1 h-10'
              >
                {copied ? (
                  <Check className='h-4 w-4 mr-2 text-green-600' />
                ) : (
                  <Copy className='h-4 w-4 mr-2' />
                )}
                {copied ? '已复制' : '复制'}
              </Button>
              <Button
                onClick={downloadJson}
                disabled={!output}
                variant='outline'
                className='flex-1 h-10'
              >
                <Download className='h-4 w-4 mr-2' />
                下载
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 使用说明 */}
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle className='text-lg'>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground'>
            <div className='space-y-2'>
              <h4 className='font-medium text-foreground'>主要功能</h4>
              <ul className='space-y-1'>
                <li>• 美化 JSON 格式，提高可读性</li>
                <li>• 压缩 JSON 数据，节省空间</li>
                <li>• 自动验证 JSON 格式正确性</li>
                <li>• 支持复制和下载功能</li>
              </ul>
            </div>
            <div className='space-y-2'>
              <h4 className='font-medium text-foreground'>使用技巧</h4>
              <ul className='space-y-1'>
                <li>• 粘贴任意 JSON 数据到左侧输入框</li>
                <li>• 点击"格式化"美化 JSON 结构</li>
                <li>• 点击"压缩"移除多余空格</li>
                <li>• 错误信息会在输入框下方显示</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
