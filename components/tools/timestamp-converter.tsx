'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [unit, setUnit] = useState('seconds');
  const [copied, setCopied] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timestampToDate = () => {
    try {
      let ts = Number.parseInt(timestamp);
      if (unit === 'seconds') {
        ts = ts * 1000;
      }
      const date = new Date(ts);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid timestamp');
      }
      setDateTime(
        date.toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })
      );
    } catch (err) {
      toast({
        title: '转换失败',
        description: '请输入有效的时间戳',
        variant: 'destructive',
      });
    }
  };

  const dateToTimestamp = () => {
    try {
      const date = new Date(dateTime);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      let ts = date.getTime();
      if (unit === 'seconds') {
        ts = Math.floor(ts / 1000);
      }
      setTimestamp(ts.toString());
    } catch (err) {
      toast({
        title: '转换失败',
        description: '请输入有效的日期时间格式',
        variant: 'destructive',
      });
    }
  };

  const getCurrentTimestamp = () => {
    let ts = currentTime;
    if (unit === 'seconds') {
      ts = Math.floor(ts / 1000);
    }
    setTimestamp(ts.toString());
  };

  const copyToClipboard = async (value: string, type: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      toast({
        title: '复制成功',
        description: `${type}已复制到剪贴板`,
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

  const formatCurrentTime = () => {
    return new Date(currentTime).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
  };

  const getCurrentTimestampFormatted = () => {
    let ts = currentTime;
    if (unit === 'seconds') {
      ts = Math.floor(ts / 1000);
    }
    return ts.toString();
  };

  return (
    <div className='p-6 space-y-6'>
      {/* 页面标题区域 */}
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>时间戳转换工具</h1>
        <p className='text-muted-foreground'>时间戳和日期时间互相转换</p>
      </div>

      {/* 当前时间显示 */}
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle className='text-lg'>当前时间</CardTitle>
          <CardDescription>实时显示当前时间和时间戳</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-3'>
              <Label className='text-sm font-medium'>当前日期时间</Label>
              <div className='flex gap-2'>
                <Input
                  value={formatCurrentTime()}
                  readOnly
                  className='font-mono text-sm'
                />
                <Button
                  variant='outline'
                  size='sm'
                  className='h-10 w-10 p-0'
                  onClick={() =>
                    copyToClipboard(formatCurrentTime(), '当前时间')
                  }
                >
                  {copied === '当前时间' ? (
                    <Check className='h-4 w-4 text-green-600' />
                  ) : (
                    <Copy className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </div>
            <div className='space-y-3'>
              <Label className='text-sm font-medium'>
                当前时间戳 ({unit === 'seconds' ? '秒' : '毫秒'})
              </Label>
              <div className='flex gap-2'>
                <Input
                  value={getCurrentTimestampFormatted()}
                  readOnly
                  className='font-mono text-sm'
                />
                <Button
                  variant='outline'
                  size='sm'
                  className='h-10 w-10 p-0'
                  onClick={() =>
                    copyToClipboard(
                      getCurrentTimestampFormatted(),
                      '当前时间戳'
                    )
                  }
                >
                  {copied === '当前时间戳' ? (
                    <Check className='h-4 w-4 text-green-600' />
                  ) : (
                    <Copy className='h-4 w-4' />
                  )}
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-10'
                  onClick={getCurrentTimestamp}
                >
                  <RefreshCw className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 转换工具区域 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* 时间戳转换为日期 */}
        <Card>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>时间戳转日期</CardTitle>
            <CardDescription>将时间戳转换为可读的日期时间</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              <Label className='text-sm font-medium'>时间戳</Label>
              <div className='flex gap-2'>
                <Input
                  type='text'
                  placeholder='输入时间戳...'
                  value={timestamp}
                  onChange={e => setTimestamp(e.target.value)}
                  className='font-mono'
                />
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className='w-20'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='seconds'>秒</SelectItem>
                    <SelectItem value='milliseconds'>毫秒</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='space-y-3'>
              <Label className='text-sm font-medium'>转换结果</Label>
              <div className='flex gap-2'>
                <Input
                  value={dateTime}
                  readOnly
                  className='font-mono text-sm'
                  placeholder='转换结果将显示在这里...'
                />
                {dateTime && (
                  <Button
                    variant='outline'
                    size='sm'
                    className='h-10 w-10 p-0'
                    onClick={() => copyToClipboard(dateTime, '转换结果')}
                  >
                    {copied === '转换结果' ? (
                      <Check className='h-4 w-4 text-green-600' />
                    ) : (
                      <Copy className='h-4 w-4' />
                    )}
                  </Button>
                )}
              </div>
            </div>

            <Button onClick={timestampToDate} className='w-full h-10'>
              转换为日期
            </Button>
          </CardContent>
        </Card>

        {/* 日期转换为时间戳 */}
        <Card>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>日期转时间戳</CardTitle>
            <CardDescription>将日期时间转换为时间戳</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              <Label className='text-sm font-medium'>日期时间</Label>
              <Input
                type='datetime-local'
                value={dateTime}
                onChange={e => setDateTime(e.target.value)}
                className='font-mono'
              />
            </div>

            <div className='space-y-3'>
              <Label className='text-sm font-medium'>
                转换结果 ({unit === 'seconds' ? '秒' : '毫秒'})
              </Label>
              <div className='flex gap-2'>
                <Input
                  value={timestamp}
                  readOnly
                  className='font-mono text-sm'
                  placeholder='转换结果将显示在这里...'
                />
                {timestamp && (
                  <Button
                    variant='outline'
                    size='sm'
                    className='h-10 w-10 p-0'
                    onClick={() => copyToClipboard(timestamp, '时间戳')}
                  >
                    {copied === '时间戳' ? (
                      <Check className='h-4 w-4 text-green-600' />
                    ) : (
                      <Copy className='h-4 w-4' />
                    )}
                  </Button>
                )}
              </div>
            </div>

            <Button onClick={dateToTimestamp} className='w-full h-10'>
              转换为时间戳
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 常用时间戳 */}
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle className='text-lg'>常用时间戳</CardTitle>
          <CardDescription>一些常用的时间戳参考</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
            <div className='space-y-2'>
              <h4 className='font-medium'>Unix 纪元</h4>
              <div className='space-y-1 text-muted-foreground'>
                <div className='flex justify-between'>
                  <span>1970-01-01 00:00:00</span>
                  <span className='font-mono'>0</span>
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <h4 className='font-medium'>常用格式</h4>
              <div className='space-y-1 text-muted-foreground'>
                <div>秒级: 10位数字</div>
                <div>毫秒级: 13位数字</div>
              </div>
            </div>
            <div className='space-y-2'>
              <h4 className='font-medium'>时区说明</h4>
              <div className='space-y-1 text-muted-foreground'>
                <div>时间戳为UTC时间</div>
                <div>显示为本地时间</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
