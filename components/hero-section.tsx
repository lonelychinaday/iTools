import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="container flex flex-col items-center text-center">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="space-y-4 md:space-y-6">
          <div className="inline-block rounded-full bg-muted px-4 py-1.5 text-sm font-medium">
            ✨ New tools added weekly
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            All the tools you need <br className="hidden md:inline" />
            in one place
          </h1>
          <p className="mx-auto max-w-[42rem] text-muted-foreground md:text-xl">
            Our comprehensive toolkit helps you build faster, work smarter, and deliver better results. Trusted by over
            10,000 developers and teams worldwide.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="gap-2">
            Get started <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            View demo
          </Button>
        </div>
        <div className="mt-16 w-full max-w-5xl rounded-lg border bg-background p-2 shadow-lg">
          <div className="relative aspect-video w-full overflow-hidden rounded bg-muted">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Toolkit dashboard preview"
              width={1280}
              height={720}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
