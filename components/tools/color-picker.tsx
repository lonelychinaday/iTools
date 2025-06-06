"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function ColorPicker() {
  const [color, setColor] = useState("#3b82f6")
  const [copied, setCopied] = useState("")
  const { toast } = useToast()

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null

    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const rgb = hexToRgb(color)
  const hsl = hexToHsl(color)

  const copyToClipboard = async (value: string, format: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(format)
      toast({
        title: "复制成功",
        description: `${format} 值已复制到剪贴板`,
      })
      setTimeout(() => setCopied(""), 2000)
    } catch (err) {
      toast({
        title: "复制失败",
        description: "无法复制到剪贴板",
        variant: "destructive",
      })
    }
  }

  const presetColors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
    "#64748b",
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">颜色选择器</h1>
        <p className="text-muted-foreground">颜色格式转换和调色板工具</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>颜色选择</CardTitle>
            <CardDescription>选择或输入颜色值</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>颜色选择器</Label>
                <div className="flex gap-4 items-center">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-16 h-16 rounded-lg border cursor-pointer"
                  />
                  <div className="flex-1 h-16 rounded-lg border" style={{ backgroundColor: color }} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>HEX 值</Label>
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#000000"
                  className="font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>预设颜色</Label>
              <div className="grid grid-cols-6 gap-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    onClick={() => setColor(presetColor)}
                    className="w-8 h-8 rounded border-2 border-transparent hover:border-gray-300 transition-colors"
                    style={{ backgroundColor: presetColor }}
                    title={presetColor}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>颜色格式</CardTitle>
            <CardDescription>不同格式的颜色值</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>HEX</Label>
              <div className="flex gap-2">
                <Input value={color.toUpperCase()} readOnly className="font-mono" />
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(color.toUpperCase(), "HEX")}>
                  {copied === "HEX" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {rgb && (
              <div className="space-y-2">
                <Label>RGB</Label>
                <div className="flex gap-2">
                  <Input value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
                  >
                    {copied === "RGB" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            {hsl && (
              <div className="space-y-2">
                <Label>HSL</Label>
                <div className="flex gap-2">
                  <Input value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
                  >
                    {copied === "HSL" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            {rgb && (
              <div className="space-y-2">
                <Label>RGBA (50% 透明度)</Label>
                <div className="flex gap-2">
                  <Input value={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`, "RGBA")}
                  >
                    {copied === "RGBA" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 使用颜色选择器直观地选择颜色</li>
            <li>• 支持 HEX、RGB、HSL、RGBA 等多种颜色格式</li>
            <li>• 点击预设颜色快速选择常用颜色</li>
            <li>• 可以直接输入 HEX 值来设置颜色</li>
            <li>• 点击复制按钮将颜色值复制到剪贴板</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
