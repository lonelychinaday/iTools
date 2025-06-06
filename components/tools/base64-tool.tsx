"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export function Base64Tool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
    } catch (err) {
      toast({
        title: "编码失败",
        description: "输入包含无效字符",
        variant: "destructive",
      })
    }
  }

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
    } catch (err) {
      toast({
        title: "解码失败",
        description: "输入不是有效的 Base64 格式",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      toast({
        title: "复制成功",
        description: "结果已复制到剪贴板",
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
        <h1 className="text-2xl font-bold">Base64 编码/解码工具</h1>
        <p className="text-muted-foreground">Base64 格式的编码和解码转换</p>
      </div>

      <Tabs defaultValue="encode" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">编码</TabsTrigger>
          <TabsTrigger value="decode">解码</TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>原始文本</CardTitle>
                <CardDescription>输入需要编码的文本</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="请输入要编码的文本..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[200px]"
                />
                <Button onClick={encode} className="w-full">
                  编码为 Base64
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Base64 结果</CardTitle>
                <CardDescription>编码后的 Base64 字符串</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[200px] font-mono"
                  placeholder="编码结果将显示在这里..."
                />
                <Button onClick={copyToClipboard} disabled={!output} variant="outline" className="w-full">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? "已复制" : "复制结果"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="decode" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Base64 字符串</CardTitle>
                <CardDescription>输入需要解码的 Base64 字符串</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="请输入 Base64 字符串..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[200px] font-mono"
                />
                <Button onClick={decode} className="w-full">
                  解码 Base64
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>解码结果</CardTitle>
                <CardDescription>解码后的原始文本</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea value={output} readOnly className="min-h-[200px]" placeholder="解码结果将显示在这里..." />
                <Button onClick={copyToClipboard} disabled={!output} variant="outline" className="w-full">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? "已复制" : "复制结果"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Base64 是一种基于64个可打印字符来表示二进制数据的编码方式</li>
            <li>• 常用于在文本协议中传输二进制数据</li>
            <li>• 编码：将普通文本转换为 Base64 格式</li>
            <li>• 解码：将 Base64 格式转换回原始文本</li>
            <li>• 支持中文和特殊字符的编码解码</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
