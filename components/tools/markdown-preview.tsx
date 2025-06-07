"use client"

import { useState } from "react"
import { Copy, Check, Eye, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(`# Markdown 预览示例

## 这是一个二级标题

这是一段普通文本，支持 **粗体** 和 *斜体* 文字。

### 列表示例

- 无序列表项 1
- 无序列表项 2
  - 嵌套列表项
  - 另一个嵌套项

1. 有序列表项 1
2. 有序列表项 2
3. 有序列表项 3

### 代码示例

行内代码：\`console.log('Hello World')\`

代码块：
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### 链接和图片

[这是一个链接](https://example.com)

### 引用

> 这是一个引用块
> 可以包含多行内容

### 表格

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

---

这是一条分割线上方的内容。`)

  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // 简单的 Markdown 转 HTML 函数
  const markdownToHtml = (md: string) => {
    let html = md
      // 标题
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // 粗体和斜体
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // 行内代码
      .replace(/`(.*?)`/g, "<code>$1</code>")
      // 链接
      .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // 分割线
      .replace(/^---$/gm, "<hr>")
      // 引用
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
      // 代码块
      .replace(/```(\w+)?\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
      // 无序列表
      .replace(/^\s*[-*+]\s+(.*$)/gim, "<li>$1</li>")
      // 有序列表
      .replace(/^\s*\d+\.\s+(.*$)/gim, "<li>$1</li>")
      // 段落
      .replace(/\n\n/g, "</p><p>")
      .replace(/^(?!<[h|l|b|p|u])(.*)$/gm, "<p>$1</p>")

    // 包装列表项
    html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")

    // 清理多余的标签
    html = html.replace(/<\/ul>\s*<ul>/g, "")
    html = html.replace(/<p><\/p>/g, "")
    html = html.replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/g, "$1")
    html = html.replace(/<p>(<hr>)<\/p>/g, "$1")
    html = html.replace(/<p>(<blockquote>.*<\/blockquote>)<\/p>/g, "$1")
    html = html.replace(/<p>(<pre>.*<\/pre>)<\/p>/gs, "$1")
    html = html.replace(/<p>(<ul>.*<\/ul>)<\/p>/gs, "$1")

    return html
  }

  const copyToClipboard = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      toast({
        title: "复制成功",
        description: `${type}已复制到剪贴板`,
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "复制失败",
        description: "无法复制到剪贴板",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Markdown 预览工具</h1>
        <p className="text-muted-foreground">实时预览 Markdown 格式文档</p>
      </div>

      <Tabs defaultValue="split" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit" className="gap-2">
            <Edit className="h-4 w-4" />
            编辑
          </TabsTrigger>
          <TabsTrigger value="split" className="gap-2">
            分屏
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <Eye className="h-4 w-4" />
            预览
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Markdown 编辑器</CardTitle>
              <CardDescription>输入 Markdown 格式的文本</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
                placeholder="在这里输入 Markdown 内容..."
              />
              <Button onClick={() => copyToClipboard(markdown, "Markdown 内容")} variant="outline" className="w-full">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                复制 Markdown
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="split">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Markdown 编辑器</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="在这里输入 Markdown 内容..."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>实时预览</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="min-h-[400px] prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }}
                  style={{
                    lineHeight: "1.6",
                    color: "inherit",
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>预览结果</CardTitle>
              <CardDescription>Markdown 渲染后的效果</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="min-h-[500px] prose prose-sm max-w-none p-4 border rounded-lg"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }}
                style={{
                  lineHeight: "1.6",
                  color: "inherit",
                }}
              />
              <Button
                onClick={() => copyToClipboard(markdownToHtml(markdown), "HTML 内容")}
                variant="outline"
                className="w-full"
              >
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                复制 HTML
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Markdown 语法参考</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4>标题</h4>
              <code># 一级标题</code>
              <br />
              <code>## 二级标题</code>
              <br />
              <code>### 三级标题</code>
            </div>
            <div className="space-y-2">
              <h4>文本样式</h4>
              <code>**粗体**</code>
              <br />
              <code>*斜体*</code>
              <br />
              <code>`行内代码`</code>
            </div>
            <div className="space-y-2">
              <h4>列表</h4>
              <code>- 无序列表</code>
              <br />
              <code>1. 有序列表</code>
            </div>
            <div className="space-y-2">
              <h4>链接和引用</h4>
              <code>[链接文字](URL)</code>
              <br />
              <code>&gt; 引用文字</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
