"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Scan, Home, Settings, FlaskRoundIcon as Flask } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Scan",
      path: "/scan",
      icon: Scan,
    },
    {
      name: "Additives",
      path: "/additives",
      icon: Flask,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ]

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">EatSmarty</span>
          </Link>
        </div>

        <nav className="hidden md:flex md:items-center md:gap-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                isActive(route.path) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <route.icon className="h-4 w-4" />
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 pb-4 md:hidden">
          <nav className="flex flex-col space-y-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent ${
                  isActive(route.path) ? "bg-accent" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <route.icon className="h-4 w-4" />
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

