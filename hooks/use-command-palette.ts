'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * 命令面板管理 Hook
 * 提供快捷键监听和状态管理功能
 */
export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // 客户端初始化时检测操作系统
  useEffect(() => {
    setIsClient(true);
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform));
  }, []);

  // 获取快捷键组合
  const getShortcut = useCallback(() => {
    return isMac ? 'Cmd+K' : 'Ctrl+K';
  }, [isMac]);

  // 处理快捷键
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // 只在客户端处理快捷键
      if (!isClient) return;

      // 检查是否按下了正确的组合键
      const isCorrectModifier = isMac ? e.metaKey : e.ctrlKey;

      if (e.key === 'k' && isCorrectModifier && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        setOpen(prev => !prev);
      }

      // ESC 键关闭面板
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    },
    [isMac, open, isClient]
  );

  // 注册快捷键监听
  useEffect(() => {
    if (!isClient) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isClient]);

  // 手动打开面板
  const openCommandPalette = useCallback(() => {
    setOpen(true);
  }, []);

  // 手动关闭面板
  const closeCommandPalette = useCallback(() => {
    setOpen(false);
  }, []);

  // 切换面板状态
  const toggleCommandPalette = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return {
    /** 面板是否打开 */
    open,
    /** 设置面板打开状态 */
    setOpen,
    /** 手动打开面板 */
    openCommandPalette,
    /** 手动关闭面板 */
    closeCommandPalette,
    /** 切换面板状态 */
    toggleCommandPalette,
    /** 获取当前平台的快捷键组合 */
    getShortcut,
    /** 是否为 Mac 系统 */
    isMac,
    /** 是否为客户端 */
    isClient,
  };
}
