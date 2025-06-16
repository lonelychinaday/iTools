// 全局命令面板控制器
class CommandPaletteController {
  private openCallback: (() => void) | null = null;

  // 注册打开命令面板的回调函数
  registerOpenCallback(callback: () => void) {
    this.openCallback = callback;
  }

  // 打开命令面板
  open() {
    if (this.openCallback) {
      this.openCallback();
    }
  }

  // 清理回调函数
  unregister() {
    this.openCallback = null;
  }
}

// 创建全局实例
export const commandPaletteController = new CommandPaletteController();
