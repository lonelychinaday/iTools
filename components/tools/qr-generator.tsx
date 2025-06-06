"use client"

import { useState } from "react"
import { Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

export function QrGenerator() {
  const [text, setText] = useState("")
  const [size, setSize] = useState([200])
  const [errorLevel, setErrorLevel] = useState("M")
  const [qrUrl, setQrUrl] = useState("")
  const { toast } = useToast()

  const generateQR = () => {
    if (!text.trim()) {
      toast({
        title: "生成失败",
        description: "请输入要生成二维码的内容",
        variant: "destructive",
      })
      return
    }

    // 使用 QR Server API 生成二维码
    const encodedText = encodeURIComponent(text)
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size[0]}x${size[0]}&data=${encodedText}&ecc=${errorLevel}`
    setQrUrl(url)
  }

  const downloadQR = () => {
    if (!qrUrl) return

    const link = document.createElement("a")
    link.href = qrUrl
    link.download = "qrcode.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearAll = () => {
    setText("")
    setQrUrl("")
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">二维码生成器</h1>
        <p className="text-muted-foreground">生成自定义二维码图片</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>二维码设置</CardTitle>
            <CardDescription>配置二维码内容和样式</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>二维码内容</Label>
              <Textarea
                placeholder="输入文本、URL、联系信息等..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label>
                尺寸: {size[0]}x{size[0]} 像素
              </Label>
              <Slider value={size} onValueChange={setSize} max={500} min={100} step={10} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label>容错级别</Label>
              <Select value={errorLevel} onValueChange={setErrorLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">低 (L) - 约7%</SelectItem>
                  <SelectItem value="M">中 (M) - 约15%</SelectItem>
                  <SelectItem value="Q">较高 (Q) - 约25%</SelectItem>
                  <SelectItem value="H">高 (H) - 约30%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateQR} className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                生成二维码
              </Button>
              <Button onClick={clearAll} variant="outline">
                清空
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>生成结果</CardTitle>
            <CardDescription>生成的二维码图片</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center min-h-[300px] border-2 border-dashed border-muted-foreground/25 rounded-lg">
              {qrUrl ? (
                <img
                  src={qrUrl || "/placeholder.svg"}
                  alt="Generated QR Code"
                  className="max-w-full max-h-full"
                  style={{ width: size[0], height: size[0] }}
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <div className="text-4xl mb-2">📱</div>
                  <p>二维码将显示在这里</p>
                </div>
              )}
            </div>

            <Button onClick={downloadQR} disabled={!qrUrl} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              下载二维码
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>常用二维码类型</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">网址链接</h4>
              <p className="text-sm text-muted-foreground">https://example.com</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">WiFi 连接</h4>
              <p className="text-sm text-muted-foreground">WIFI:T:WPA;S:网络名;P:密码;;</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">联系信息</h4>
              <p className="text-sm text-muted-foreground">
                BEGIN:VCARD
                <br />
                VERSION:3.0
                <br />
                FN:姓名
                <br />
                TEL:电话
                <br />
                END:VCARD
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">短信</h4>
              <p className="text-sm text-muted-foreground">SMS:手机号:短信内容</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 支持文本、URL、联系信息、WiFi 等多种内容类型</li>
            <li>• 可调节二维码尺寸，适应不同使用场景</li>
            <li>• 容错级别越高，二维码越复杂但抗损坏能力越强</li>
            <li>• 生成的二维码可直接下载保存</li>
            <li>• 支持中文字符和特殊符号</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
