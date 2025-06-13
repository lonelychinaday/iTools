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
      <svg
        width='32'
        height='32'
        viewBox='0 0 64 64'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='40' cy='26' r='16' fill='#FF9B0F' />
        <path d='M42 22L54.1244 49H29.8756L42 22Z' fill='#28E361' />
        <rect x='10' y='30' width='24' height='24' fill='#1ABAFA' />
      </svg>
    ),
    {
      ...size,
    }
  );
}
