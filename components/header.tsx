"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Linkedin, Mail, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" }
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center gap-1">
          <span className="text-violet-600 dark:text-violet-400">Md</span>Ayeen
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400 ${
                isActive(item.href) ? "text-violet-600 dark:text-violet-400 font-semibold" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-6 flex flex-col justify-between">
              <div>
                <SheetHeader className="border-b pb-4 mb-6">
                  <SheetTitle className="text-2xl font-bold text-violet-600 dark:text-violet-400 text-left">
                    Navigation
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400 ${
                        isActive(item.href) ? "text-violet-600 dark:text-violet-400 font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="border-t pt-6">
                <div className="flex justify-center space-x-6">
                  <Link
                    href="https://github.com/mdayeen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                    aria-label="GitHub profile"
                  >
                    <Github className="h-6 w-6" />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/mdyeen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="h-6 w-6" />
                  </Link>
                  <Link
                    href="mailto:ayeen0410@gmail.com"
                    className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                    aria-label="Email address"
                  >
                    <Mail className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
