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
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: 'white',
          borderRadius: '2px',
        }}
      >
        {/* 橙色圆形 */}
        <div
          style={{
            position: 'absolute',
            left: '20px',
            top: '13px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#FF9B0F',
          }}
        />

        {/* 绿色三角形 */}
        <div
          style={{
            position: 'absolute',
            left: '15px',
            top: '11px',
            width: '0',
            height: '0',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: '13.5px solid #28E361',
          }}
        />

        {/* 蓝色矩形 */}
        <div
          style={{
            position: 'absolute',
            left: '5px',
            top: '15px',
            width: '12px',
            height: '12px',
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
