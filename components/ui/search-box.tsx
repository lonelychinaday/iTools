'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface SearchBoxProps {
  /** 搜索查询字符串 */
  value: string;
  /** 搜索值变化回调 */
  onChange: (value: string) => void;
  /** 占位符文本 */
  placeholder?: string;
  /** 自定义样式类名 */
  className?: string;
  /** 输入框样式类名 */
  inputClassName?: string;
  /** 搜索图标样式类名 */
  iconClassName?: string;
  /** 清除按钮样式类名 */
  clearButtonClassName?: string;
  /** 是否显示清除按钮 */
  showClearButton?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸变体 */
  size?: 'sm' | 'md' | 'lg';
  /** 样式变体 */
  variant?: 'default' | 'header' | 'home';
  /** 是否显示快捷键提示 */
  showShortcut?: boolean;
  /** 点击时是否触发命令面板 */
  triggerCommandPalette?: boolean;
  /** 命令面板触发回调 */
  onCommandPaletteTrigger?: () => void;
}

/**
 * 可复用的搜索框组件
 * 支持多种尺寸和样式变体，适用于不同场景
 */
export function SearchBox({
  value,
  onChange,
  placeholder = '搜索...',
  className,
  inputClassName,
  iconClassName,
  clearButtonClassName,
  showClearButton = true,
  disabled = false,
  size = 'md',
  variant = 'default',
  showShortcut = false,
  triggerCommandPalette = false,
  onCommandPaletteTrigger,
}: SearchBoxProps) {
  // 清除搜索内容
  const handleClear = () => {
    onChange('');
  };

  // 处理输入框点击
  const handleInputClick = () => {
    if (triggerCommandPalette && onCommandPaletteTrigger) {
      onCommandPaletteTrigger();
    }
  };

  // 使用状态管理操作系统检测，避免SSR水合错误
  const [isMac, setIsMac] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 只在客户端执行
    setIsClient(true);
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform));
  }, []);

  // 获取快捷键文本
  const shortcutText = isMac ? '⌘K' : 'Ctrl+K';

  // 根据尺寸设置样式
  const sizeStyles = {
    sm: {
      container: 'relative',
      input: 'h-8 pl-8 pr-8 text-sm',
      icon: 'h-3.5 w-3.5 left-2.5',
      clearButton: 'right-2 h-3 w-3',
    },
    md: {
      container: 'relative',
      input: 'h-10 pl-10 pr-10',
      icon: 'h-4 w-4 left-3',
      clearButton: 'right-3 h-4 w-4',
    },
    lg: {
      container: 'relative',
      input: 'h-11 pl-10 pr-10',
      icon: 'h-4 w-4 left-3',
      clearButton: 'right-3 h-4 w-4',
    },
  };

  // 根据变体设置样式
  const variantStyles = {
    default: {
      input: 'bg-background border-border',
    },
    header: {
      input:
        'bg-muted/50 border border-border/20 rounded-md focus:bg-background focus:ring-1 focus:ring-ring/30 transition-all placeholder:text-muted-foreground/70',
    },
    home: {
      input:
        'bg-muted/50 border border-border/20 backdrop-blur-sm focus:bg-background transition-colors',
    },
  };

  const currentSizeStyles = sizeStyles[size];
  const currentVariantStyles = variantStyles[variant];

  return (
    <div className={cn(currentSizeStyles.container, className)}>
      {/* 搜索图标 */}
      <Search
        className={cn(
          'absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10',
          currentSizeStyles.icon,
          iconClassName
        )}
      />

      {/* 输入框 */}
      <Input
        type='text'
        placeholder={placeholder}
        value={triggerCommandPalette ? '' : value}
        onChange={
          triggerCommandPalette ? undefined : e => onChange(e.target.value)
        }
        onClick={handleInputClick}
        disabled={disabled}
        readOnly={triggerCommandPalette}
        className={cn(
          currentSizeStyles.input,
          currentVariantStyles.input,
          'relative z-0',
          triggerCommandPalette && 'cursor-pointer',
          inputClassName
        )}
      />

      {/* 快捷键提示 */}
      {showShortcut && isClient && (
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 right-3 text-xs text-muted-foreground/60 pointer-events-none z-10 border border-border/30 rounded px-1.5 py-0.5 bg-muted/30',
            size === 'sm' && 'right-2 text-xs',
            size === 'lg' && 'right-3 text-sm'
          )}
        >
          {shortcutText}
        </div>
      )}

      {/* 清除按钮 */}
      {showClearButton && value && !triggerCommandPalette && (
        <button
          onClick={handleClear}
          disabled={disabled}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed',
            currentSizeStyles.clearButton,
            clearButtonClassName
          )}
          type='button'
        >
          <X className='h-full w-full' />
        </button>
      )}
    </div>
  );
}
