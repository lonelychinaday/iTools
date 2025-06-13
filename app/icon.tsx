import { ImageResponse } from 'next/og';

// 图标尺寸配置
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// 生成图标
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '4px',
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
