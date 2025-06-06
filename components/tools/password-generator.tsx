"use client"

import { useState } from "react"
import { Copy, Check, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([12])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generatePassword = () => {
    let charset = ""

    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, "")
    }

    if (!charset) {
      toast({
        title: "生成失败",
        description: "请至少选择一种字符类型",
        variant: "destructive",
      })
      return
    }

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(result)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      toast({
        title: "复制成功",
        description: "密码已复制到剪贴板",
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

  const getPasswordStrength = () => {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) return { text: "弱", color: "text-red-500" }
    if (score <= 4) return { text: "中等", color: "text-yellow-500" }
    return { text: "强", color: "text-green-500" }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">密码生成器</h1>
        <p className="text-muted-foreground">生成安全的随机密码</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>密码设置</CardTitle>
            <CardDescription>配置密码生成选项</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>密码长度: {length[0]}</Label>
              <Slider value={length} onValueChange={setLength} max={50} min={4} step={1} className="w-full" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
                <Label htmlFor="uppercase">包含大写字母 (A-Z)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
                <Label htmlFor="lowercase">包含小写字母 (a-z)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                <Label htmlFor="numbers">包含数字 (0-9)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
                <Label htmlFor="symbols">包含特殊字符 (!@#$%^&*)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="exclude-similar" checked={excludeSimilar} onCheckedChange={setExcludeSimilar} />
                <Label htmlFor="exclude-similar">排除相似字符 (il1Lo0O)</Label>
              </div>
            </div>

            <Button onClick={generatePassword} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              生成密码
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>生成的密码</CardTitle>
            <CardDescription>您的安全密码</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input value={password} readOnly className="font-mono text-lg" placeholder="点击生成密码..." />
              {password && (
                <div className="flex items-center justify-between text-sm">
                  <span>
                    密码强度: <span className={getPasswordStrength().color}>{getPasswordStrength().text}</span>
                  </span>
                  <span>长度: {password.length}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={copyToClipboard} disabled={!password} variant="outline" className="flex-1">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "已复制" : "复制密码"}
              </Button>
              <Button onClick={generatePassword} disabled={!password} variant="outline">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>密码安全建议</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 使用至少 12 个字符的密码</li>
            <li>• 包含大小写字母、数字和特殊字符</li>
            <li>• 避免使用个人信息或常见词汇</li>
            <li>• 为不同账户使用不同的密码</li>
            <li>• 定期更换重要账户的密码</li>
            <li>• 使用密码管理器来安全存储密码</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
