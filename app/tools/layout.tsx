import { SidebarProvider } from '@/components/sidebar-provider';
import { LocaleProvider } from '@/components/locale-provider';
import { getServerLocale } from '@/lib/locale-server';
import { getServerSidebarState } from '@/lib/sidebar-server';
import { ToolsLayoutClient } from '@/components/tools-layout-client';

// 接收从根布局传递的props
interface ToolsLayoutProps {
  children: React.ReactNode;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

// 服务端组件 - 获取初始状态
export default async function ToolsLayout({
  children,
  sidebarOpen,
  onSidebarToggle,
}: ToolsLayoutProps) {
  // 并行获取服务端状态（不传入具体工具ID，让客户端处理）
  const [locale, sidebarState] = await Promise.all([
    getServerLocale(),
    getServerSidebarState(), // 不传入toolId，使用默认状态
  ]);

  return (
    <LocaleProvider serverLocale={locale}>
      <SidebarProvider serverSidebarState={sidebarState}>
        <ToolsLayoutClient
          sidebarOpen={sidebarOpen}
          onSidebarToggle={onSidebarToggle}
        >
          {children}
        </ToolsLayoutClient>
      </SidebarProvider>
    </LocaleProvider>
  );
}
