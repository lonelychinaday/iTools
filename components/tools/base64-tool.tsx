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
import { useTranslation } from '@/hooks/use-translation';

export function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

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
