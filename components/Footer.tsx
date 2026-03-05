import Link from 'next/link'
import { Instagram, Twitter, Mail, Facebook } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-zinc-50 dark:bg-black mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Branding */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tighter text-primary italic">
                YENKO-DUBS-<span className="text-foreground">SNACKS</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium snacks delivered straight to your doorstep. Satisfying
              your cravings, one dub at a time.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold uppercase tracking-widest text-xs">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-medium">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Socials */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold uppercase tracking-widest text-xs">
                Get In Touch
              </h3>
              <Link
                href="mailto:Yenkodubs@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="p-2 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span>Yenkodubs@gmail.com</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Centered and Clean */}
        <div className="mt-12 pt-8 border-t text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
          <p>&copy; {currentYear} Yenko Dubs Snacks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
