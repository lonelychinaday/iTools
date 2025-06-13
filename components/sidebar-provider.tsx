'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { SidebarState } from '@/lib/sidebar-server';

interface SidebarContextType {
  collapsed: boolean;
  expandedCategories: string[];
  isMobile: boolean;
  toggleCollapsed: () => void;
  toggleCategory: (categoryId: string) => void;
  setExpandedCategories: (categories: string[]) => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

interface SidebarProviderProps {
  children: ReactNode;
  serverSidebarState: SidebarState; // 从服务端传入的侧边栏状态
}

export function SidebarProvider({
  children,
  serverSidebarState,
}: SidebarProviderProps) {
  const [collapsed, setCollapsed] = useState(serverSidebarState.collapsed);
  const [expandedCategories, setExpandedCategoriesState] = useState(
    serverSidebarState.expandedCategories
  );
  const [isMobile] = useState(serverSidebarState.isMobile);

  // 客户端水合后，从localStorage同步状态（仅桌面端）
  useEffect(() => {
    if (!isMobile) {
      try {
        // 同步collapsed状态
        const cookieCollapsed = document.cookie
          .split('; ')
          .find(row => row.startsWith('sidebar:collapsed='))
          ?.split('=')[1];

        if (cookieCollapsed && cookieCollapsed !== String(collapsed)) {
          setCollapsed(cookieCollapsed === 'true');
        }

        // 同步expandedCategories状态
        const cookieExpanded = document.cookie
          .split('; ')
          .find(row => row.startsWith('sidebar:expanded-categories='))
          ?.split('=')[1];

        if (cookieExpanded) {
          const decoded = decodeURIComponent(cookieExpanded);
          const parsed = JSON.parse(decoded);
          if (
            Array.isArray(parsed) &&
            JSON.stringify(parsed) !== JSON.stringify(expandedCategories)
          ) {
            setExpandedCategoriesState(parsed);
          }
        }
      } catch (error) {
        // 开发环境可以显示错误，但生产环境静默失败
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn('Failed to sync sidebar state from cookies:', error);
        }
      }
    }
  }, [collapsed, expandedCategories, isMobile]);

  // 切换侧边栏收起状态（仅桌面端）
  const toggleCollapsed = () => {
    if (isMobile) return; // 移动端不支持收起

    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);

    // 保存到Cookie
    document.cookie = `sidebar:collapsed=${newCollapsed}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
  };

  // 切换分类展开状态（仅桌面端）
  const toggleCategory = (categoryId: string) => {
    if (isMobile) return; // 移动端不保存分类状态

    const newCategories = expandedCategories.includes(categoryId)
      ? expandedCategories.filter(id => id !== categoryId)
      : [...expandedCategories, categoryId];

    setExpandedCategoriesState(newCategories);

    // 保存到Cookie
    document.cookie = `sidebar:expanded-categories=${encodeURIComponent(JSON.stringify(newCategories))}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
  };

  // 设置展开的分类列表（仅桌面端）
  const setExpandedCategories = (categories: string[]) => {
    if (isMobile) return; // 移动端不保存分类状态

    setExpandedCategoriesState(categories);

    // 保存到Cookie
    document.cookie = `sidebar:expanded-categories=${encodeURIComponent(JSON.stringify(categories))}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
  };

  const contextValue: SidebarContextType = {
    collapsed,
    expandedCategories,
    isMobile,
    toggleCollapsed,
    toggleCategory,
    setExpandedCategories,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
}
