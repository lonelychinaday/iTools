import { BRAND, STRUCTURED_DATA } from '@/lib/copy-config';
import { getServerLocale } from '@/lib/locale-server';
import { getLocalizedSEO } from '@/lib/seo-i18n';
import { ClientHomePage } from '@/components/client-home-page';

// 生成国际化的结构化数据
async function generateJsonLd() {
  const locale = await getServerLocale();
  const localizedSEO = await getLocalizedSEO(locale);
  const isZh = locale === 'zh';

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
        featureList: STRUCTURED_DATA.webApplication.features,
      },
      {
        '@type': 'Organization',
        '@id': `${BRAND.domain}/#organization`,
        name: STRUCTURED_DATA.organization.name,
        url: BRAND.domain,
        description: STRUCTURED_DATA.organization.description,
        foundingDate: STRUCTURED_DATA.organization.foundingDate,
        sameAs: [BRAND.github],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: isZh ? '在线工具集合' : 'Online Tools Collection',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'SoftwareApplication',
                name: isZh
                  ? 'Base64 编码解码工具'
                  : 'Base64 Encoder/Decoder Tool',
                applicationCategory: 'DeveloperApplication',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'SoftwareApplication',
                name: isZh ? 'JSON 格式化工具' : 'JSON Formatter Tool',
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
