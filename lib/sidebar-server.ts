import { headers, cookies } from 'next/headers';

export type SidebarState = {
  collapsed: boolean;
  expandedCategories: string[];
  isMobile: boolean;
};

export type SidebarSettings = {
  collapsed: boolean;
  expandedCategories: string[];
};

const DEFAULT_EXPANDED_CATEGORIES = ['text-tools'];

/**
 * 检测设备是否为移动设备（服务端）
 */
async function getServerIsMobile(): Promise<boolean> {
  try {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';

    // 基于User-Agent进行移动设备检测
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(userAgent);
  } catch (error) {
    // 开发环境显示警告
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('Failed to detect mobile from server:', error);
    }
    return false; // 默认为桌面端
  }
}

/**
 * 获取服务端侧边栏状态
 */
export async function getServerSidebarState(
  selectedTool?: string
): Promise<SidebarState> {
  try {
    const cookieStore = await cookies();
    const isMobile = await getServerIsMobile();

    // 移动端不保存状态，总是使用默认值
    if (isMobile) {
      return {
        collapsed: false,
        expandedCategories: getInitialExpandedCategories(selectedTool),
        isMobile: true,
      };
    }

    // 桌面端从Cookie读取状态
    const collapsedCookie = cookieStore.get('sidebar:collapsed')?.value;
    const expandedCategoriesCookie = cookieStore.get(
      'sidebar:expanded-categories'
    )?.value;

    let collapsed = false;
    let expandedCategories = getInitialExpandedCategories(selectedTool);

    if (collapsedCookie) {
      collapsed = collapsedCookie === 'true';
    }

    if (expandedCategoriesCookie) {
      try {
        const parsed = JSON.parse(expandedCategoriesCookie);
        if (Array.isArray(parsed)) {
          expandedCategories = parsed;

          // 确保选中工具的分类被包含
          if (selectedTool) {
            const toolCategoryId = getToolCategoryId(selectedTool);
            if (
              toolCategoryId &&
              !expandedCategories.includes(toolCategoryId)
            ) {
              expandedCategories = [...expandedCategories, toolCategoryId];
            }
          }
        }
      } catch (error) {
        // 解析失败时使用默认值
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn('Failed to parse expanded categories cookie:', error);
        }
      }
    }

    return {
      collapsed,
      expandedCategories,
      isMobile: false,
    };
  } catch (error) {
    // 开发环境显示警告
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('Failed to get server sidebar state:', error);
    }

    // 出错时返回安全的默认状态
    return {
      collapsed: false,
      expandedCategories: getInitialExpandedCategories(selectedTool),
      isMobile: false,
    };
  }
}

/**
 * 获取初始展开的分类列表
 */
function getInitialExpandedCategories(selectedTool?: string): string[] {
  if (selectedTool) {
    const categoryId = getToolCategoryId(selectedTool);
    if (categoryId) {
      return [categoryId];
    }
  }
  return [...DEFAULT_EXPANDED_CATEGORIES];
}

/**
 * 根据工具ID获取所属分类ID
 * 这里需要导入工具配置，但为了避免循环依赖，我们内联一个简化版本
 */
function getToolCategoryId(toolId: string): string | null {
  // 工具到分类的映射表（简化版本，避免循环依赖）
  // 当前项目只有一个工具，后续可以根据实际工具扩展
  const toolCategoryMap: Record<string, string> = {
    'base64-tool': 'text-tools',
    // 可以在这里添加更多工具映射
  };

  return toolCategoryMap[toolId] || 'text-tools';
}

/**
 * 设置服务端侧边栏状态（主要用于中间件）
 */
export async function setServerSidebarSettings(
  settings: Partial<SidebarSettings>
) {
  try {
    const cookieStore = await cookies();

    if (settings.collapsed !== undefined) {
      cookieStore.set('sidebar:collapsed', String(settings.collapsed), {
        maxAge: 365 * 24 * 60 * 60, // 1年
        path: '/',
        sameSite: 'lax',
      });
    }

    if (settings.expandedCategories !== undefined) {
      cookieStore.set(
        'sidebar:expanded-categories',
        JSON.stringify(settings.expandedCategories),
        {
          maxAge: 365 * 24 * 60 * 60, // 1年
          path: '/',
          sameSite: 'lax',
        }
      );
    }
  } catch (error) {
    // 开发环境显示警告
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('Failed to set server sidebar settings:', error);
    }
  }
}
