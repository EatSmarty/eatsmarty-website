import Link from "next/link"
import { ArrowRight, Carrot, Coffee, Fish, Milk, Pizza, Sandwich } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import FloatingPaths from "@/components/floadting-bg"

const categories = [
  {
    title: "Dairy",
    description: "Milk, cheese, yogurt, and other dairy products",
    icon: Milk,
    href: "/categories/dairy",
  },
  {
    title: "Snacks",
    description: "Chips, cookies, crackers, and other snack foods",
    icon: Pizza,
    href: "/categories/snacks",
  },
  {
    title: "Beverages",
    description: "Coffee, tea, juice, soda, and other drinks",
    icon: Coffee,
    href: "/categories/beverages",
  },
  {
    title: "Produce",
    description: "Fruits, vegetables, and fresh produce",
    icon: Carrot,
    href: "/categories/produce",
  },
  {
    title: "Protein",
    description: "Meat, poultry, fish, and plant-based proteins",
    icon: Fish,
    href: "/categories/protein",
  },
  {
    title: "Prepared Foods",
    description: "Ready-to-eat meals and prepared foods",
    icon: Sandwich,
    href: "/categories/prepared-foods",
  },
]





export default function Home() {
  

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      <section className="mb-16 flex flex-col items-center text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Know what&apos;s in your food
        </h1>
        <p className="mb-8 max-w-2xl text-xl text-muted-foreground">
          Scan supermarket products to access nutrition facts, ingredients, and detailed information about what you eat.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/scan">
              Scan a Product
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/additives">View Additives</Link>
          </Button>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Scan</h3>
            <p className="text-muted-foreground">Use your camera to scan the barcode on any food product</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Discover</h3>
            <p className="text-muted-foreground">Get instant access to detailed nutrition facts and ingredients</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Learn</h3>
            <p className="text-muted-foreground">Understand what additives are in your food and their health impacts</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-center text-3xl font-bold">Explore Food Categories</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.title} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="h-5 w-5" />
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href={category.href}>
                    Browse {category.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

