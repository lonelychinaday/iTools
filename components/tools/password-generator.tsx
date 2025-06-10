'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatePassword = () => {
    let charset = '';

    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }

    if (!charset) {
      toast({
        title: '生成失败',
        description: '请至少选择一种字符类型',
        variant: 'destructive',
      });
      return;
    }

    let result = '';
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(result);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast({
        title: '复制成功',
        description: '密码已复制到剪贴板',
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

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { text: '弱', color: 'text-red-500' };
    if (score <= 4) return { text: '中等', color: 'text-yellow-500' };
    return { text: '强', color: 'text-green-500' };
  };

  return (
    <div className='p-6 space-y-6'>
      {/* 页面标题区域 */}
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>密码生成器</h1>
        <p className='text-muted-foreground'>生成安全的随机密码</p>
      </div>

      {/* 主要内容区域 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* 设置面板 */}
        <Card>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>密码设置</CardTitle>
            <CardDescription>配置密码生成选项</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* 长度设置 */}
            <div className='space-y-3'>
              <Label className='text-sm font-medium'>
                密码长度: {length[0]}
              </Label>
              <Slider
                value={length}
                onValueChange={setLength}
                max={50}
                min={4}
                step={1}
                className='w-full'
              />
            </div>

            {/* 字符类型选择 */}
            <div className='space-y-4'>
              <Label className='text-sm font-medium'>字符类型</Label>
              <div className='space-y-3'>
                <div className='flex items-center space-x-3'>
                  <Checkbox
                    id='uppercase'
                    checked={includeUppercase}
                    onCheckedChange={checked =>
                      setIncludeUppercase(checked === true)
                    }
                  />
                  <Label
                    htmlFor='uppercase'
                    className='text-sm font-normal cursor-pointer'
                  >
                    包含大写字母 (A-Z)
                  </Label>
                </div>

                <div className='flex items-center space-x-3'>
                  <Checkbox
                    id='lowercase'
                    checked={includeLowercase}
                    onCheckedChange={checked =>
                      setIncludeLowercase(checked === true)
                    }
                  />
                  <Label
                    htmlFor='lowercase'
                    className='text-sm font-normal cursor-pointer'
                  >
                    包含小写字母 (a-z)
                  </Label>
                </div>

                <div className='flex items-center space-x-3'>
                  <Checkbox
                    id='numbers'
                    checked={includeNumbers}
                    onCheckedChange={checked =>
                      setIncludeNumbers(checked === true)
                    }
                  />
                  <Label
                    htmlFor='numbers'
                    className='text-sm font-normal cursor-pointer'
                  >
                    包含数字 (0-9)
                  </Label>
                </div>

                <div className='flex items-center space-x-3'>
                  <Checkbox
                    id='symbols'
                    checked={includeSymbols}
                    onCheckedChange={checked =>
                      setIncludeSymbols(checked === true)
                    }
                  />
                  <Label
                    htmlFor='symbols'
                    className='text-sm font-normal cursor-pointer'
                  >
                    包含特殊字符 (!@#$%^&*)
                  </Label>
                </div>

                <div className='flex items-center space-x-3'>
                  <Checkbox
                    id='exclude-similar'
                    checked={excludeSimilar}
                    onCheckedChange={checked =>
                      setExcludeSimilar(checked === true)
                    }
                  />
                  <Label
                    htmlFor='exclude-similar'
                    className='text-sm font-normal cursor-pointer'
                  >
                    排除相似字符 (il1Lo0O)
                  </Label>
                </div>
              </div>
            </div>

            {/* 生成按钮 */}
            <Button onClick={generatePassword} className='w-full h-10'>
              <RefreshCw className='h-4 w-4 mr-2' />
              生成密码
            </Button>
          </CardContent>
        </Card>

        {/* 结果面板 */}
        <Card>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>生成的密码</CardTitle>
            <CardDescription>您的安全密码</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {/* 密码输出 */}
            <div className='space-y-3'>
              <Label className='text-sm font-medium'>密码</Label>
              <div className='relative'>
                <Input
                  value={password}
                  readOnly
                  className='font-mono text-base pr-10'
                  placeholder='点击生成密码...'
                />
                {password && (
                  <Button
                    variant='ghost'
                    size='sm'
                    className='absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0'
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className='h-4 w-4 text-green-600' />
                    ) : (
                      <Copy className='h-4 w-4' />
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* 密码强度 */}
            {password && (
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label className='text-sm font-medium'>密码强度</Label>
                  <span
                    className={`text-sm font-medium ${getPasswordStrength().color}`}
                  >
                    {getPasswordStrength().text}
                  </span>
                </div>
                <div className='text-sm text-muted-foreground space-y-1'>
                  <div>长度: {password.length} 字符</div>
                </div>
              </div>
            )}

            {/* 密码分析 */}
            {password && (
              <div className='p-4 rounded-lg bg-muted/30 space-y-2'>
                <div className='text-sm font-medium'>密码构成</div>
                <div className='grid grid-cols-2 gap-2 text-xs text-muted-foreground'>
                  <div>大写字母: {(password.match(/[A-Z]/g) || []).length}</div>
                  <div>小写字母: {(password.match(/[a-z]/g) || []).length}</div>
                  <div>数字: {(password.match(/[0-9]/g) || []).length}</div>
                  <div>
                    特殊字符: {(password.match(/[^A-Za-z0-9]/g) || []).length}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 安全提示卡片 */}
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle className='text-lg'>密码安全建议</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground'>
            <div className='space-y-2'>
              <h4 className='font-medium text-foreground'>强密码特征</h4>
              <ul className='space-y-1'>
                <li>• 至少 12 个字符长度</li>
                <li>• 包含大小写字母</li>
                <li>• 包含数字和特殊字符</li>
                <li>• 避免个人信息</li>
              </ul>
            </div>
            <div className='space-y-2'>
              <h4 className='font-medium text-foreground'>安全使用</h4>
              <ul className='space-y-1'>
                <li>• 每个账户使用不同密码</li>
                <li>• 定期更换重要密码</li>
                <li>• 使用密码管理器</li>
                <li>• 启用双因素认证</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
