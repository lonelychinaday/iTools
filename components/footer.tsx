import Link from "next/link"
import { Facebook, Github, Instagram, Linkedin, Settings, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40" style={{
      '--custom-hover-color': '#18a058'
    } as React.CSSProperties}>
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold mb-4">
              <Settings className="h-5 w-5" />
              <span>ToolKit</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Powerful tools to streamline your workflow and boost productivity.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover-green">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover-green">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover-green">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover-green">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover-green">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              {["Features", "Pricing", "Integrations", "Changelog", "Documentation"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover-green">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {["About", "Blog", "Careers", "Customers", "Partners"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover-green">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {["Help Center", "Contact Us", "Status", "Terms of Service", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover-green">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ToolKit, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
