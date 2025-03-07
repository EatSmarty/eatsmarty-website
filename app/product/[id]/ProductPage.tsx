"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProductStore } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { scannedProduct } = useProductStore()
  const { toast } = useToast()

  // In a real app, you would fetch product data from an API using the ID
  // For this demo, we'll use the product from the store or a mock product
  const product = scannedProduct || {
    id: params.id,
    name: "Organic Granola Cereal",
    brand: "Nature's Best",
    image: "/placeholder.svg?height=300&width=300",
    nutritionFacts: {
      calories: 120,
      fat: 3.5,
      carbs: 22,
      protein: 4,
      sugar: 8,
    },
    ingredients: [
      "Rolled oats",
      "Honey",
      "Sunflower oil",
      "Almonds",
      "Coconut",
      "Brown sugar",
      "Salt",
      "Natural flavor",
      "Vitamin E (E306)",
    ],
    additives: ["E306"],
  }

  useEffect(() => {
    if (!scannedProduct) {
      toast({
        description: "Loading product information from barcode: " + params.id,
      })
    }
  }, [scannedProduct, params.id, toast])

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="mb-6 overflow-hidden rounded-lg border bg-background p-4">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="mx-auto h-auto w-full max-w-md object-contain"
              priority
            />
          </div>
        </div>

        <div>
          <div className="mb-6">
            <p className="mb-1 text-sm font-medium text-muted-foreground">{product.brand}</p>
            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-muted-foreground">Barcode: {product.id}</p>
          </div>

          <Tabs defaultValue="nutrition">
            <TabsList className="w-full">
              <TabsTrigger value="nutrition" className="flex-1">
                Nutrition
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="flex-1">
                Ingredients
              </TabsTrigger>
              <TabsTrigger value="additives" className="flex-1">
                Additives
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nutrition">
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Facts</CardTitle>
                  <CardDescription>Per serving (30g)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Calories</span>
                      <span>{product.nutritionFacts.calories} kcal</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Fat</span>
                      <span>{product.nutritionFacts.fat}g</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Carbohydrates</span>
                      <span>{product.nutritionFacts.carbs}g</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Protein</span>
                      <span>{product.nutritionFacts.protein}g</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="font-medium">Sugar</span>
                      <span>{product.nutritionFacts.sugar}g</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ingredients">
              <Card>
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{product.ingredients.join(", ")}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="additives">
              <Card>
                <CardHeader>
                  <CardTitle>Additives</CardTitle>
                  <CardDescription>
                    {product.additives.length === 0
                      ? "No additives found in this product."
                      : `${product.additives.length} additive(s) found in this product.`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {product.additives.length > 0 ? (
                    <ul className="space-y-2">
                      {product.additives.map((additive) => (
                        <li key={additive} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">{additive}</span>
                              <p className="text-sm text-muted-foreground">Vitamin E (Antioxidant)</p>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/additives/${additive}`}>
                                <Info className="h-4 w-4" />
                                <span className="sr-only">More info</span>
                              </Link>
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted-foreground">No additives found in this product.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

