import { BRAND, STRUCTURED_DATA } from '@/lib/copy-config';
import { getServerLocale } from '@/lib/locale-server';
import { getLocalizedSEO } from '@/lib/seo-i18n';
import { ClientHomePage } from '@/components/client-home-page';

// 生成国际化的结构化数据
async function generateJsonLd() {
  const locale = await getServerLocale();
  const localizedSEO = await getLocalizedSEO(locale);

  // 基于语言的功能列表
  const featureList =
    locale === 'zh'
      ? [
          localizedSEO.structured.base64ToolName,
          localizedSEO.structured.jsonToolName,
          '密码生成器',
          'URL编码解码',
          'Hash计算',
          '时间戳转换',
          '颜色转换',
          'UUID生成',
        ]
      : [
          'Base64 Encoder/Decoder',
          'JSON Formatter',
          'Password Generator',
          'URL Encoder/Decoder',
          'Hash Calculator',
          'Timestamp Converter',
          'Color Converter',
          'UUID Generator',
        ];

  // 基于语言的组织描述
  const organizationDescription =
    locale === 'zh'
      ? '提供免费在线开发者工具的现代化平台'
      : 'Modern platform providing free online developer tools';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${BRAND.domain}/#webapp`,
        name: STRUCTURED_DATA.webApplication.name,
        url: BRAND.domain,
        description: localizedSEO.description.main,
        applicationCategory: STRUCTURED_DATA.webApplication.category,
        operatingSystem: STRUCTURED_DATA.webApplication.operatingSystem,
        browserRequirements: STRUCTURED_DATA.webApplication.browserRequirements,
        softwareVersion: STRUCTURED_DATA.webApplication.softwareVersion,
        author: {
          '@type': 'Organization',
          name: BRAND.name,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          category: 'Free',
        },
        featureList,
      },
      {
        '@type': 'Organization',
        '@id': `${BRAND.domain}/#organization`,
        name: STRUCTURED_DATA.organization.name,
        url: BRAND.domain,
        description: organizationDescription,
        foundingDate: STRUCTURED_DATA.organization.foundingDate,
        sameAs: [BRAND.github],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: localizedSEO.structured.offerCatalogName,
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'SoftwareApplication',
                name: localizedSEO.structured.base64ToolName,
                applicationCategory: 'DeveloperApplication',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'SoftwareApplication',
                name: localizedSEO.structured.jsonToolName,
                applicationCategory: 'DeveloperApplication',
              },
            },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${BRAND.domain}/#website`,
        url: BRAND.domain,
        name: localizedSEO.title.short,
        description: localizedSEO.description.short,
        publisher: {
          '@id': `${BRAND.domain}/#organization`,
        },
        inLanguage: [
          {
            '@type': 'Language',
            name: 'Chinese',
            alternateName: 'zh-CN',
          },
          {
            '@type': 'Language',
            name: 'English',
            alternateName: 'en-US',
          },
        ],
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BRAND.domain}/tools?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

export default async function Home() {
  const jsonLd = await generateJsonLd();

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientHomePage />
    </>
  );
}
