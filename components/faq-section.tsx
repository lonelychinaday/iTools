import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is included in the toolkit?",
    answer:
      "Our toolkit includes a comprehensive set of tools for developers, designers, and product teams. This includes code generators, data transformers, analytics dashboards, document generators, design systems, and performance optimization tools.",
  },
  {
    question: "Can I use the toolkit for commercial projects?",
    answer:
      "Yes, all paid plans allow you to use our toolkit for commercial projects. The Free plan has some limitations for commercial use, so please check our terms of service for details.",
  },
  {
    question: "How often are new tools added?",
    answer:
      "We add new tools and features on a regular basis, typically every 2-4 weeks. All updates are included in your subscription at no additional cost.",
  },
  {
    question: "Is there a limit to how many projects I can create?",
    answer:
      "The Free plan allows up to 3 projects. The Pro plan includes up to 20 projects, and the Enterprise plan offers unlimited projects.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Find answers to common questions about our toolkit.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
