"use client"

import { useState, useEffect } from "react"
import { Copy, Check, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [unit, setUnit] = useState("seconds")
  const [copied, setCopied] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const timestampToDate = () => {
    try {
      let ts = Number.parseInt(timestamp)
      if (unit === "seconds") {
        ts = ts * 1000
      }
      const date = new Date(ts)
      if (isNaN(date.getTime())) {
        throw new Error("Invalid timestamp")
      }
      setDateTime(
        date.toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        }),
      )
    } catch (err) {
      toast({
        title: "转换失败",
        description: "请输入有效的时间戳",
        variant: "destructive",
      })
    }
  }

  const dateToTimestamp = () => {
    try {
      const date = new Date(dateTime)
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date")
      }
      let ts = date.getTime()
      if (unit === "seconds") {
        ts = Math.floor(ts / 1000)
      }
      setTimestamp(ts.toString())
    } catch (err) {
      toast({
        title: "转换失败",
        description: "请输入有效的日期时间格式",
        variant: "destructive",
      })
    }
  }

  const getCurrentTimestamp = () => {
    let ts = currentTime
    if (unit === "seconds") {
      ts = Math.floor(ts / 1000)
    }
    setTimestamp(ts.toString())
  }

  const copyToClipboard = async (value: string, type: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(type)
      toast({
        title: "复制成功",
        description: `${type}已复制到剪贴板`,
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

  const formatCurrentTime = () => {
    return new Date(currentTime).toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    })
  }

  const getCurrentTimestampFormatted = () => {
    let ts = currentTime
    if (unit === "seconds") {
      ts = Math.floor(ts / 1000)
    }
    return ts.toString()
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">时间戳转换工具</h1>
        <p className="text-muted-foreground">时间戳和日期时间互相转换</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>当前时间</CardTitle>
          <CardDescription>实时显示当前时间和时间戳</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>当前日期时间</Label>
              <div className="flex gap-2">
                <Input value={formatCurrentTime()} readOnly className="font-mono" />
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(formatCurrentTime(), "当前时间")}>
                  {copied === "当前时间" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>当前时间戳 ({unit === "seconds" ? "秒" : "毫秒"})</Label>
              <div className="flex gap-2">
                <Input value={getCurrentTimestampFormatted()} readOnly className="font-mono" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(getCurrentTimestampFormatted(), "当前时间戳")}
                >
                  {copied === "当前时间戳" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={getCurrentTimestamp}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>时间戳转日期</CardTitle>
            <CardDescription>将时间戳转换为可读的日期时间</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>时间戳单位</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seconds">秒 (10位)</SelectItem>
                  <SelectItem value="milliseconds">毫秒 (13位)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>时间戳</Label>
              <Input
                placeholder={unit === "seconds" ? "1640995200" : "1640995200000"}
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="font-mono"
              />
            </div>

            <Button onClick={timestampToDate} className="w-full">
              转换为日期时间
            </Button>

            <div className="space-y-2">
              <Label>转换结果</Label>
              <div className="flex gap-2">
                <Input value={dateTime} readOnly className="font-mono" placeholder="转换结果将显示在这里..." />
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!dateTime}
                  onClick={() => copyToClipboard(dateTime, "日期时间")}
                >
                  {copied === "日期时间" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>日期转时间戳</CardTitle>
            <CardDescription>将日期时间转换为时间戳</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>日期时间</Label>
              <Input
                type="datetime-local"
                value={dateTime.replace(/(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2}).*/, "$1-$2-$3T$4:$5:$6")}
                onChange={(e) => {
                  const date = new Date(e.target.value)
                  setDateTime(date.toLocaleString("zh-CN"))
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>或手动输入</Label>
              <Input
                placeholder="2024-01-01 12:00:00"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="font-mono"
              />
            </div>

            <Button onClick={dateToTimestamp} className="w-full">
              转换为时间戳
            </Button>

            <div className="space-y-2">
              <Label>转换结果 ({unit === "seconds" ? "秒" : "毫秒"})</Label>
              <div className="flex gap-2">
                <Input value={timestamp} readOnly className="font-mono" placeholder="转换结果将显示在这里..." />
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!timestamp}
                  onClick={() => copyToClipboard(timestamp, "时间戳")}
                >
                  {copied === "时间戳" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 时间戳是从 1970年1月1日 00:00:00 UTC 开始的秒数或毫秒数</li>
            <li>• 10位时间戳表示秒，13位时间戳表示毫秒</li>
            <li>• 支持当前时间的实时显示和快速获取</li>
            <li>• 可以输入日期时间或使用日期选择器</li>
            <li>• 支持多种日期时间格式的输入</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
