import { MetadataRoute } from 'next';
import { PWA_CONFIG } from '@/lib/copy-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: PWA_CONFIG.name,
    short_name: PWA_CONFIG.shortName,
    description: PWA_CONFIG.description,
    start_url: '/',
    display: 'standalone',
    background_color: PWA_CONFIG.backgroundColor,
    theme_color: PWA_CONFIG.themeColor,
    orientation: 'portrait',
    categories: ['productivity', 'utilities', 'developer'],
    lang: 'zh-CN',
    scope: '/',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'Base64 编码',
        short_name: 'Base64',
        description: 'Base64 编码和解码工具',
        url: '/tools/base64-tool',
      },
    ],
  };
}
