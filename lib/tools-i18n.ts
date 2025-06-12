import { toolCategories } from './tools';
import { type Locale, t } from '@/i18n';

// 获取国际化的工具分类数据
export function getLocalizedToolCategories(locale: Locale) {
  return toolCategories.map(category => ({
    ...category,
    name: t(`tools.categories.${category.id}` as any, locale),
    tools: category.tools.map(tool => ({
      ...tool,
      name: t(`tools.names.${tool.id}` as any, locale),
      description: t(`tools.descriptions.${tool.id}` as any, locale),
    })),
  }));
}

// 根据工具ID获取国际化名称
export function getLocalizedToolName(toolId: string, locale: Locale): string {
  return t(`tools.names.${toolId}` as any, locale);
}

// 根据工具ID获取国际化描述
export function getLocalizedToolDescription(
  toolId: string,
  locale: Locale
): string {
  return t(`tools.descriptions.${toolId}` as any, locale);
}

// 根据分类ID获取国际化分类名称
export function getLocalizedCategoryName(
  categoryId: string,
  locale: Locale
): string {
  return t(`tools.categories.${categoryId}` as any, locale);
}
