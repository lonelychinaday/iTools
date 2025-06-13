import { ImageResponse } from 'next/og';

// Apple图标尺寸配置
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

// 生成Apple图标
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background:
            'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        VT
      </div>
    ),
    {
      ...size,
    }
  );
}
