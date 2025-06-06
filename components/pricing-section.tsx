import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PricingSection() {
  return (
    <section id="pricing" className="bg-muted/50 py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <div className="mt-4 flex items-baseline text-5xl font-bold">
                $0<span className="ml-1 text-lg font-medium text-muted-foreground">/month</span>
              </div>
              <CardDescription className="mt-4">Perfect for trying out our toolkit.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {["3 tools", "Basic features", "Community support", "1 user"].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Get started
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-primary">
            <CardHeader>
              <div className="rounded-full bg-primary/10 text-primary text-sm font-medium py-1 px-3 w-fit mb-4">
                Most Popular
              </div>
              <CardTitle>Pro</CardTitle>
              <div className="mt-4 flex items-baseline text-5xl font-bold">
                $29<span className="ml-1 text-lg font-medium text-muted-foreground">/month</span>
              </div>
              <CardDescription className="mt-4">Everything you need for professional work.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {["All tools", "Advanced features", "Priority support", "5 users", "API access", "Custom exports"].map(
                  (feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ),
                )}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get started</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <div className="mt-4 flex items-baseline text-5xl font-bold">
                $99<span className="ml-1 text-lg font-medium text-muted-foreground">/month</span>
              </div>
              <CardDescription className="mt-4">For teams that need more power and control.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "All Pro features",
                  "Unlimited users",
                  "Dedicated support",
                  "Custom integrations",
                  "Advanced security",
                  "Usage analytics",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Contact sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
