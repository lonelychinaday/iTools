'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';

// 定义性能指标类型
interface PerformanceMetric {
  name: string;
  value: number | object;
  path: string;
  timestamp: number;
}

// 定义性能条目类型
interface PerformanceEntryWithValue extends PerformanceEntry {
  value?: number;
  hadRecentInput?: boolean;
  processingStart?: number;
}

interface SEOMonitorProps {
  title?: string;
  description?: string;
  keywords?: string[];
}

/**
 * SEO 监控组件
 * 在开发环境下检查页面的 SEO 配置是否合理
 */
export function SEOMonitor(_props: SEOMonitorProps) {
  const { ts } = useTranslation();

  useEffect(() => {
    // 仅在生产环境监控
    if (process.env.NODE_ENV !== 'production') return;

    // 监控 Core Web Vitals
    const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

    function sendToAnalytics(metric: PerformanceMetric) {
      // 发送到分析服务
      const body = JSON.stringify(metric);

      if (navigator.sendBeacon) {
        navigator.sendBeacon(vitalsUrl, body);
      } else {
        fetch(vitalsUrl, {
          body,
          method: 'POST',
          keepalive: true,
        });
      }
    }

    // 监控 LCP (Largest Contentful Paint)
    function observeLCP() {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const lcp = entry as PerformanceEntry;

          sendToAnalytics({
            name: 'LCP',
            value: lcp.startTime,
            path: window.location.pathname,
            timestamp: Date.now(),
          });
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    }

    // 监控 FID (First Input Delay)
    function observeFID() {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const fid = entry as PerformanceEntryWithValue;

          sendToAnalytics({
            name: 'FID',
            value: (fid.processingStart || 0) - fid.startTime,
            path: window.location.pathname,
            timestamp: Date.now(),
          });
        }
      });

      observer.observe({ type: 'first-input', buffered: true });
    }

    // 监控 CLS (Cumulative Layout Shift)
    function observeCLS() {
      let clsValue = 0;
      const clsEntries: PerformanceEntryWithValue[] = [];

      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const layoutShift = entry as PerformanceEntryWithValue;
          if (!layoutShift.hadRecentInput) {
            clsValue += layoutShift.value || 0;
            clsEntries.push(layoutShift);
          }
        }
      });

      observer.observe({ type: 'layout-shift', buffered: true });

      // 页面隐藏时发送 CLS 数据
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          sendToAnalytics({
            name: 'CLS',
            value: clsValue,
            path: window.location.pathname,
            timestamp: Date.now(),
          });
        }
      });
    }

    // 监控页面加载时间
    function observePageLoad() {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;

        sendToAnalytics({
          name: 'page-load',
          value: navigation.loadEventEnd - navigation.loadEventStart,
          path: window.location.pathname,
          timestamp: Date.now(),
        });
      });
    }

    // SEO 关键元素检查
    function checkSEOElements() {
      const checks = {
        hasTitle: !!document.title,
        hasMetaDescription: !!document.querySelector(
          'meta[name="description"]'
        ),
        hasCanonical: !!document.querySelector('link[rel="canonical"]'),
        hasOpenGraph: !!document.querySelector('meta[property^="og:"]'),
        hasStructuredData: !!document.querySelector(
          'script[type="application/ld+json"]'
        ),
        hasH1: !!document.querySelector('h1'),
        imageCount: document.querySelectorAll('img').length,
        imagesWithAlt: document.querySelectorAll('img[alt]').length,
      };

      sendToAnalytics({
        name: 'seo-check',
        value: checks,
        path: window.location.pathname,
        timestamp: Date.now(),
      });
    }

    // 启动监控
    try {
      observeLCP();
      observeFID();
      observeCLS();
      observePageLoad();

      // 延迟执行 SEO 检查，确保页面完全加载
      setTimeout(checkSEOElements, 2000);
    } catch (error) {
      // 生产环境静默处理错误，开发环境记录日志
      console.warn(ts('seo.console.initFailed', 'SEO监控初始化失败:'), error);
    }

    // 清理函数
    return () => {
      // 性能观察器会自动清理
    };
  }, [ts]);

  return null; // 这是一个监控组件，不渲染UI
}

// Web Vitals 评分函数
export function getWebVitalsScore(
  metric: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, [number, number]> = {
    LCP: [2500, 4000],
    FID: [100, 300],
    CLS: [0.1, 0.25],
  };

  const [good, poor] = thresholds[metric] || [0, 0];

  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

// 开发环境 SEO 调试组件
export function SEODebugger() {
  const { ts } = useTranslation();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // 开发环境下的 SEO 检查
      console.group('🔍 SEO 调试信息');

      // 检查标题
      const title = document.title;
      console.log(ts('seo.console.pageTitle', '页面标题:'), title);
      if (title && (title.length < 30 || title.length > 60)) {
        console.warn(
          ts(
            'seo.console.titleLengthWarning',
            '⚠️ 标题长度建议在 30-60 字符之间'
          )
        );
      }

      // 检查描述
      const description = document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content');
      console.log(ts('seo.console.pageDescription', '页面描述:'), description);
      if (
        description &&
        (description.length < 120 || description.length > 160)
      ) {
        console.warn(
          ts(
            'seo.console.descriptionLengthWarning',
            '⚠️ 描述长度建议在 120-160 字符之间'
          )
        );
      }

      // 检查 H1 标签
      const h1Count = document.querySelectorAll('h1').length;
      console.log(ts('seo.console.h1Count', 'H1 标签数量:'), h1Count);
      if (h1Count !== 1) {
        console.warn(
          ts('seo.console.h1Warning', '⚠️ 每个页面应该只有一个 H1 标签')
        );
      }

      // 检查图片 alt 属性
      const images = document.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
      if (imagesWithoutAlt.length > 0) {
        console.warn(
          `⚠️ ${imagesWithoutAlt.length} ${ts('seo.console.imagesWithoutAlt', '张图片缺少 alt 属性')}`
        );
      }

      console.groupEnd();
    }
  }, [ts]);

  return null;
}
