import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VerseTool - Online Toolbox',
    short_name: 'VerseTool',
    description:
      'Modern collection of online tools including Base64 encoder/decoder, JSON formatter, password generator and other utilities',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'Base64 Encoder',
        short_name: 'Base64',
        description: 'Base64 encoding and decoding tool',
        url: '/tools/base64-tool',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
    ],
  };
}
