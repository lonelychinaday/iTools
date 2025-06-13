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
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: 'white',
          borderRadius: '20px',
        }}
      >
        {/* 橙色圆形 */}
        <div
          style={{
            position: 'absolute',
            left: '112px',
            top: '73px',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            background: '#FF9B0F',
          }}
        />

        {/* 绿色三角形 */}
        <div
          style={{
            position: 'absolute',
            left: '118px',
            top: '62px',
            width: '0',
            height: '0',
            borderLeft: '17px solid transparent',
            borderRight: '17px solid transparent',
            borderBottom: '38px solid #28E361',
          }}
        />

        {/* 蓝色矩形 */}
        <div
          style={{
            position: 'absolute',
            left: '28px',
            top: '84px',
            width: '67px',
            height: '67px',
            background: '#1ABAFA',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
