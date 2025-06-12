'use client';

import { useState, useEffect } from 'react';
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
import { useTranslation } from '@/hooks/use-translation';

export function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
    } catch (err) {
      toast({
        title: t('toolsDetail.base64Tool.encodeFailed'),
        description: t('toolsDetail.base64Tool.encodeFailedDesc'),
        variant: 'destructive',
      });
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
    } catch (err) {
      toast({
        title: t('toolsDetail.base64Tool.decodeFailed'),
        description: t('toolsDetail.base64Tool.decodeFailedDesc'),
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: t('common.copySuccess'),
        description: t('toolsDetail.base64Tool.copySuccessDesc'),
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: t('common.copyFailed'),
        description: t('common.cannotCopyToClipboard'),
        variant: 'destructive',
      });
    }
  };

  if (!isInitialized) {
    return (
      <div className='p-6 space-y-6'>
        {/* 页面标题区域 */}
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Base64 编码/解码工具
          </h1>
          <p className='text-muted-foreground'>
            快速进行 Base64 编码和解码，支持文本和 URL 安全编码
          </p>
        </div>

        <Tabs defaultValue='encode' className='space-y-6'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='encode'>编码</TabsTrigger>
            <TabsTrigger value='decode'>解码</TabsTrigger>
          </TabsList>

          <TabsContent value='encode' className='space-y-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* 编码输入面板 */}
              <Card>
                <CardHeader className='pb-4'>
                  <CardTitle className='text-lg'>原始文本</CardTitle>
                  <CardDescription>输入需要编码的文本内容</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <Textarea
                    placeholder='在此输入需要编码的文本...'
                    value=''
                    readOnly
                    className='min-h-[250px] resize-none'
                  />
                  <Button className='w-full h-10'>编码</Button>
                </CardContent>
              </Card>

              {/* 编码结果面板 */}
              <Card>
                <CardHeader className='pb-4'>
                  <CardTitle className='text-lg'>Base64 结果</CardTitle>
                  <CardDescription>编码后的 Base64 字符串</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <Textarea
                    value=''
                    readOnly
                    className='min-h-[250px] font-mono text-sm resize-none'
                    placeholder='编码结果将在这里显示...'
                  />
                  <Button disabled variant='outline' className='w-full h-10'>
                    <Copy className='h-4 w-4 mr-2' />
                    复制结果
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='decode' className='space-y-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* 解码输入面板 */}
              <Card>
                <CardHeader className='pb-4'>
                  <CardTitle className='text-lg'>Base64 字符串</CardTitle>
                  <CardDescription>
                    输入需要解码的 Base64 字符串
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <Textarea
                    placeholder='在此输入 Base64 字符串...'
                    value=''
                    readOnly
                    className='min-h-[250px] font-mono text-sm resize-none'
                  />
                  <Button className='w-full h-10'>解码</Button>
                </CardContent>
              </Card>

              {/* 解码结果面板 */}
              <Card>
                <CardHeader className='pb-4'>
                  <CardTitle className='text-lg'>解码结果</CardTitle>
                  <CardDescription>解码后的原始文本</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <Textarea
                    value=''
                    readOnly
                    className='min-h-[250px] resize-none'
                    placeholder='解码结果将在这里显示...'
                  />
                  <Button disabled variant='outline' className='w-full h-10'>
                    <Copy className='h-4 w-4 mr-2' />
                    复制结果
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

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
                  <li>• 支持任意文本的 Base64 编码</li>
                  <li>• 支持 Base64 字符串解码</li>
                  <li>• 自动处理 UTF-8 编码</li>
                  <li>• 一键复制结果到剪贴板</li>
                </ul>
              </div>
              <div className='space-y-2'>
                <h4 className='font-medium text-foreground'>使用场景</h4>
                <ul className='space-y-1'>
                  <li>• 数据传输和存储</li>
                  <li>• 邮件附件编码</li>
                  <li>• URL 参数安全传递</li>
                  <li>• API 接口数据编码</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6'>
      {/* 页面标题区域 */}
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>
          {t('toolsDetail.base64Tool.title')}
        </h1>
        <p className='text-muted-foreground'>
          {t('toolsDetail.base64Tool.description')}
        </p>
      </div>

      <Tabs defaultValue='encode' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='encode'>
            {t('toolsDetail.base64Tool.encodeTab')}
          </TabsTrigger>
          <TabsTrigger value='decode'>
            {t('toolsDetail.base64Tool.decodeTab')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value='encode' className='space-y-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* 编码输入面板 */}
            <Card>
              <CardHeader className='pb-4'>
                <CardTitle className='text-lg'>
                  {t('toolsDetail.base64Tool.originalText')}
                </CardTitle>
                <CardDescription>
                  {t('toolsDetail.base64Tool.originalTextDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Textarea
                  placeholder={t('toolsDetail.base64Tool.originalPlaceholder')}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className='min-h-[250px] resize-none'
                />
                <Button onClick={encode} className='w-full h-10'>
                  {t('toolsDetail.base64Tool.encodeButton')}
                </Button>
              </CardContent>
            </Card>

            {/* 编码结果面板 */}
            <Card>
              <CardHeader className='pb-4'>
                <CardTitle className='text-lg'>
                  {t('toolsDetail.base64Tool.base64Result')}
                </CardTitle>
                <CardDescription>
                  {t('toolsDetail.base64Tool.base64ResultDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Textarea
                  value={output}
                  readOnly
                  className='min-h-[250px] font-mono text-sm resize-none'
                  placeholder={t(
                    'toolsDetail.base64Tool.encodeResultPlaceholder'
                  )}
                />
                <Button
                  onClick={copyToClipboard}
                  disabled={!output}
                  variant='outline'
                  className='w-full h-10'
                >
                  {copied ? (
                    <Check className='h-4 w-4 mr-2 text-green-600' />
                  ) : (
                    <Copy className='h-4 w-4 mr-2' />
                  )}
                  {copied
                    ? t('common.copied')
                    : t('toolsDetail.base64Tool.copyResult')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='decode' className='space-y-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* 解码输入面板 */}
            <Card>
              <CardHeader className='pb-4'>
                <CardTitle className='text-lg'>
                  {t('toolsDetail.base64Tool.base64String')}
                </CardTitle>
                <CardDescription>
                  {t('toolsDetail.base64Tool.base64StringDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Textarea
                  placeholder={t('toolsDetail.base64Tool.base64Placeholder')}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className='min-h-[250px] font-mono text-sm resize-none'
                />
                <Button onClick={decode} className='w-full h-10'>
                  {t('toolsDetail.base64Tool.decodeButton')}
                </Button>
              </CardContent>
            </Card>

            {/* 解码结果面板 */}
            <Card>
              <CardHeader className='pb-4'>
                <CardTitle className='text-lg'>
                  {t('toolsDetail.base64Tool.decodeResult')}
                </CardTitle>
                <CardDescription>
                  {t('toolsDetail.base64Tool.decodeResultDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Textarea
                  value={output}
                  readOnly
                  className='min-h-[250px] resize-none'
                  placeholder={t(
                    'toolsDetail.base64Tool.decodeResultPlaceholder'
                  )}
                />
                <Button
                  onClick={copyToClipboard}
                  disabled={!output}
                  variant='outline'
                  className='w-full h-10'
                >
                  {copied ? (
                    <Check className='h-4 w-4 mr-2 text-green-600' />
                  ) : (
                    <Copy className='h-4 w-4 mr-2' />
                  )}
                  {copied
                    ? t('common.copied')
                    : t('toolsDetail.base64Tool.copyResult')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 使用说明 */}
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle className='text-lg'>{t('tools.usage')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground'>
            <div className='space-y-2'>
              <h4 className='font-medium text-foreground'>
                {t('toolsDetail.base64Tool.featuresTitle')}
              </h4>
              <ul className='space-y-1'>
                <li>• {t('toolsDetail.base64Tool.featuresList.0')}</li>
                <li>• {t('toolsDetail.base64Tool.featuresList.1')}</li>
                <li>• {t('toolsDetail.base64Tool.featuresList.2')}</li>
                <li>• {t('toolsDetail.base64Tool.featuresList.3')}</li>
              </ul>
            </div>
            <div className='space-y-2'>
              <h4 className='font-medium text-foreground'>
                {t('toolsDetail.base64Tool.useCasesTitle')}
              </h4>
              <ul className='space-y-1'>
                <li>• {t('toolsDetail.base64Tool.useCasesList.0')}</li>
                <li>• {t('toolsDetail.base64Tool.useCasesList.1')}</li>
                <li>• {t('toolsDetail.base64Tool.useCasesList.2')}</li>
                <li>• {t('toolsDetail.base64Tool.useCasesList.3')}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
