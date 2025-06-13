import { ImageResponse } from 'next/og';
import { BRAND, OG_CONFIG } from '@/lib/copy-config';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'VerseTool - 在线工具箱';
    const description =
      searchParams.get('description') || '现代化的在线工具集合，让工作更高效';

    return generateOGImage({
      title,
      description,
    });
  } catch (error) {
    // 生产环境静默处理错误，开发环境记录日志
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('OG图片生成失败:', error);
    }

    // 返回默认响应
    return new Response('OG图片生成失败', { status: 500 });
  }
}

// 生成OG图片的函数
function generateOGImage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 60,
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '40px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '1000px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              marginBottom: '20px',
              background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {BRAND.name}
          </div>
          <div
            style={{
              fontSize: '32px',
              opacity: 0.9,
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            {title !== OG_CONFIG.defaults.title ? title : description}
          </div>
          <div
            style={{
              fontSize: '24px',
              opacity: 0.7,
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            🛠️ 免费在线工具集合
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
