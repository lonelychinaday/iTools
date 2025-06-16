import { BRAND } from '@/lib/copy-config';

interface HreflangTagsProps {
  pathname?: string;
}

export function HreflangTags({ pathname = '' }: HreflangTagsProps) {
  const basePath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const zhUrl = `${BRAND.domain}${basePath}`;
  const enUrl = `${BRAND.domain}${basePath}${basePath.includes('?') ? '&' : '?'}lang=en`;

  return (
    <>
      <link rel='alternate' hrefLang='zh-CN' href={zhUrl} />
      <link rel='alternate' hrefLang='en-US' href={enUrl} />
      <link rel='alternate' hrefLang='x-default' href={zhUrl} />
    </>
  );
}
