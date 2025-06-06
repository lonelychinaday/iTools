import Image from "next/image"

import { Card, CardContent, CardFooter } from "@/components/ui/card"

const testimonials = [
  {
    quote:
      "This toolkit has completely transformed our workflow. We're able to deliver projects 30% faster than before.",
    author: "Sarah Johnson",
    role: "Product Manager at TechCorp",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote: "The code generator alone has saved our team countless hours. The quality of the output is impressive.",
    author: "Michael Chen",
    role: "Lead Developer at DevStudio",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote: "As a freelancer, having all these tools in one place has been a game-changer for my productivity.",
    author: "Emma Rodriguez",
    role: "Independent Designer",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Loved by Developers Worldwide</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our users have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="relative">
                  <span className="absolute -top-6 left-0 text-6xl text-primary/20">"</span>
                  <p className="relative z-10 text-lg">{testimonial.quote}</p>
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-4 pt-4">
                <div className="rounded-full overflow-hidden h-10 w-10">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
