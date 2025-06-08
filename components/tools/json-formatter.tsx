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
    <div className='p-4 space-y-4 min-h-full'>
      <div className='flex-shrink-0'>
        <h1 className='text-xl font-semibold'>JSON 格式化工具</h1>
        <p className='text-sm text-muted-foreground'>
          格式化、压缩和验证 JSON 数据
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1'>
        <Card className='flex flex-col'>
          <CardHeader className='flex-shrink-0 pb-3'>
            <CardTitle className='text-base'>输入 JSON</CardTitle>
            <CardDescription className='text-sm'>
              粘贴或输入需要格式化的 JSON 数据
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-1 flex flex-col space-y-3'>
            <Textarea
              placeholder='请输入 JSON 数据...'
              value={input}
              onChange={e => setInput(e.target.value)}
              className='flex-1 min-h-[200px] font-mono text-sm resize-none'
            />
            <div className='flex gap-2 flex-shrink-0'>
              <Button onClick={formatJson} className='flex-1 h-8 text-sm'>
                格式化
              </Button>
              <Button
                onClick={minifyJson}
                variant='outline'
                className='flex-1 h-8 text-sm'
              >
                压缩
              </Button>
            </div>
            {error && (
              <div className='text-sm text-destructive bg-destructive/10 p-2 rounded flex-shrink-0'>
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className='flex flex-col'>
          <CardHeader className='flex-shrink-0 pb-3'>
            <CardTitle className='text-base'>格式化结果</CardTitle>
            <CardDescription className='text-sm'>
              格式化后的 JSON 数据
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-1 flex flex-col space-y-3'>
            <Textarea
              value={output}
              readOnly
              className='flex-1 min-h-[200px] font-mono text-sm resize-none'
              placeholder='格式化结果将显示在这里...'
            />
            <div className='flex gap-2 flex-shrink-0'>
              <Button
                onClick={copyToClipboard}
                disabled={!output}
                variant='outline'
                className='flex-1 h-8 text-sm'
              >
                {copied ? (
                  <Check className='h-3.5 w-3.5 mr-1.5' />
                ) : (
                  <Copy className='h-3.5 w-3.5 mr-1.5' />
                )}
                {copied ? '已复制' : '复制'}
              </Button>
              <Button
                onClick={downloadJson}
                disabled={!output}
                variant='outline'
                className='flex-1 h-8 text-sm'
              >
                <Download className='h-3.5 w-3.5 mr-1.5' />
                下载
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='flex-shrink-0'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-base'>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-1.5 text-sm text-muted-foreground'>
            <li>• 在左侧输入框中粘贴或输入 JSON 数据</li>
            <li>• 点击"格式化"按钮美化 JSON 格式</li>
            <li>• 点击"压缩"按钮移除多余空格和换行</li>
            <li>• 支持复制结果到剪贴板或下载为文件</li>
            <li>• 自动验证 JSON 格式的正确性</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
