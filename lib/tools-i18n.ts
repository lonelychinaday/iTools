import { t, type TranslationKey, type Locale } from '@/i18n';
import { toolCategories } from './tools';

// 定义工具项类型
interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// 定义工具分类类型
interface ToolCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tools: ToolItem[];
}

// 获取国际化的工具分类数据
export function getLocalizedToolCategories(locale: Locale): ToolCategory[] {
  return toolCategories.map(category => ({
    ...category,
    name: t(`tools.categories.${category.id}` as TranslationKey, locale),
    tools: category.tools.map(tool => ({
      ...tool,
      name: t(`tools.names.${tool.id}` as TranslationKey, locale),
      description: t(`tools.descriptions.${tool.id}` as TranslationKey, locale),
    })),
  }));
}

// 获取国际化的工具名称
export function getLocalizedToolName(toolId: string, locale: Locale): string {
  return t(`tools.names.${toolId}` as TranslationKey, locale);
}

// 获取国际化的工具描述
export function getLocalizedToolDescription(
  toolId: string,
  locale: Locale
): string {
  return t(`tools.descriptions.${toolId}` as TranslationKey, locale);
}

// 获取国际化的分类名称
export function getLocalizedCategoryName(
  categoryId: string,
  locale: Locale
): string {
  return t(`tools.categories.${categoryId}` as TranslationKey, locale);
}

export function getLocalizedToolInfo(
  toolId: string,
  locale: Locale
): {
  tool: ToolItem;
  category: ToolCategory;
} | null {
  const localizedCategories = getLocalizedToolCategories(locale);

  for (const category of localizedCategories) {
    const tool = category.tools.find(t => t.id === toolId);
    if (tool) {
      return { tool, category };
    }
  }

  return null;
}

// 验证工具ID是否有效（不依赖语言）
export function isValidToolId(toolId: string): boolean {
  return toolCategories.some(category =>
    category.tools.some(tool => tool.id === toolId)
  );
}

// 获取工具所属的分类ID（不依赖语言）
export function getToolCategoryId(toolId: string): string | null {
  for (const category of toolCategories) {
    if (category.tools.some(tool => tool.id === toolId)) {
      return category.id;
    }
  }
  return null;
}

// 获取所有工具ID列表（用于sitemap等）
export function getAllToolIds(): string[] {
  return toolCategories.flatMap(category =>
    category.tools.map(tool => tool.id)
  );
}
